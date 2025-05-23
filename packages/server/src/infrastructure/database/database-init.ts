import { databaseConfig, validateDatabaseConfig } from '@/config/database.config';
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import { DatabaseError, getConnectionHint, type PostgresError } from './database-error';

async function createClient(database = 'postgres'): Promise<Client> {
  const client = new Client({
    ...databaseConfig,
    user: databaseConfig.username,
    database,
  });

  try {
    await client.connect();
    console.info(
      `Connected to ${database === 'postgres' ? 'PostgreSQL' : `database: ${database}`}`,
    );
    return client;
  } catch (error) {
    const hint = getConnectionHint(error as PostgresError);
    throw new DatabaseError(`Failed to connect to ${database}`, error, hint);
  }
}

// Initialize database if it doesn't exist
export async function initializeDatabase(): Promise<void> {
  // Validate configuration first
  const configErrors = validateDatabaseConfig();
  if (configErrors.length > 0) {
    throw new DatabaseError(
      'Invalid database configuration:\n' + configErrors.map((err) => `- ${err}`).join('\n'),
    );
  }

  // Create initial database if needed
  const client = await createClient();
  try {
    // Check if database exists
    const dbExists = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [
      databaseConfig.database,
    ]);

    if (dbExists.rows.length === 0) {
      await client.query(`CREATE DATABASE ${databaseConfig.database}`);
      console.info(`Database '${databaseConfig.database}' created successfully`);
    } else {
      console.info(`Database '${databaseConfig.database}' already exists`);
    }
  } finally {
    await client.end().catch(console.error);
  }

  // Run initialization SQL if needed
  const initClient = await createClient(databaseConfig.database);
  try {
    // Try to find init.sql in both src and dist directories
    const possiblePaths = [
      path.join(__dirname, 'init.sql'), // dist directory
      path.join(__dirname, '..', '..', '..', 'src', 'infrastructure', 'database', 'init.sql'), // src directory
    ];

    let initSqlPath: string | undefined;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        initSqlPath = p;
        break;
      }
    }

    if (!initSqlPath) {
      throw new DatabaseError(
        `Initialization SQL file not found. Searched in:\n${possiblePaths.join('\n')}`,
        undefined,
        'Make sure init.sql exists in either src/infrastructure/database or dist/infrastructure/database',
      );
    }

    console.info(`Using SQL file: ${initSqlPath}`);
    const initSql = fs.readFileSync(initSqlPath, 'utf8');
    await initClient.query(initSql);
    console.info('Database initialization completed successfully');
  } catch (error) {
    const hint = getConnectionHint(error as PostgresError);
    throw new DatabaseError('Failed to initialize database schema', error, hint);
  } finally {
    await initClient.end().catch(console.error);
  }
}
