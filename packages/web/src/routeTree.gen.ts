/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UserIndexImport } from './routes/user/index'
import { Route as InventoryIndexImport } from './routes/inventory/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as AuthSignupImport } from './routes/auth/signup'
import { Route as AuthSignoutImport } from './routes/auth/signout'
import { Route as AuthSigninImport } from './routes/auth/signin'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserIndexRoute = UserIndexImport.update({
  id: '/user/',
  path: '/user/',
  getParentRoute: () => rootRoute,
} as any)

const InventoryIndexRoute = InventoryIndexImport.update({
  id: '/inventory/',
  path: '/inventory/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  id: '/auth/',
  path: '/auth/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/auth/signup',
  path: '/auth/signup',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignoutRoute = AuthSignoutImport.update({
  id: '/auth/signout',
  path: '/auth/signout',
  getParentRoute: () => rootRoute,
} as any)

const AuthSigninRoute = AuthSigninImport.update({
  id: '/auth/signin',
  path: '/auth/signin',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/signin': {
      id: '/auth/signin'
      path: '/auth/signin'
      fullPath: '/auth/signin'
      preLoaderRoute: typeof AuthSigninImport
      parentRoute: typeof rootRoute
    }
    '/auth/signout': {
      id: '/auth/signout'
      path: '/auth/signout'
      fullPath: '/auth/signout'
      preLoaderRoute: typeof AuthSignoutImport
      parentRoute: typeof rootRoute
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/auth/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof rootRoute
    }
    '/auth/': {
      id: '/auth/'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof rootRoute
    }
    '/inventory/': {
      id: '/inventory/'
      path: '/inventory'
      fullPath: '/inventory'
      preLoaderRoute: typeof InventoryIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/': {
      id: '/user/'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signout': typeof AuthSignoutRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth': typeof AuthIndexRoute
  '/inventory': typeof InventoryIndexRoute
  '/user': typeof UserIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signout': typeof AuthSignoutRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth': typeof AuthIndexRoute
  '/inventory': typeof InventoryIndexRoute
  '/user': typeof UserIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signout': typeof AuthSignoutRoute
  '/auth/signup': typeof AuthSignupRoute
  '/auth/': typeof AuthIndexRoute
  '/inventory/': typeof InventoryIndexRoute
  '/user/': typeof UserIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth/signin'
    | '/auth/signout'
    | '/auth/signup'
    | '/auth'
    | '/inventory'
    | '/user'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth/signin'
    | '/auth/signout'
    | '/auth/signup'
    | '/auth'
    | '/inventory'
    | '/user'
  id:
    | '__root__'
    | '/'
    | '/auth/signin'
    | '/auth/signout'
    | '/auth/signup'
    | '/auth/'
    | '/inventory/'
    | '/user/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthSigninRoute: typeof AuthSigninRoute
  AuthSignoutRoute: typeof AuthSignoutRoute
  AuthSignupRoute: typeof AuthSignupRoute
  AuthIndexRoute: typeof AuthIndexRoute
  InventoryIndexRoute: typeof InventoryIndexRoute
  UserIndexRoute: typeof UserIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthSigninRoute: AuthSigninRoute,
  AuthSignoutRoute: AuthSignoutRoute,
  AuthSignupRoute: AuthSignupRoute,
  AuthIndexRoute: AuthIndexRoute,
  InventoryIndexRoute: InventoryIndexRoute,
  UserIndexRoute: UserIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth/signin",
        "/auth/signout",
        "/auth/signup",
        "/auth/",
        "/inventory/",
        "/user/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth/signin": {
      "filePath": "auth/signin.tsx"
    },
    "/auth/signout": {
      "filePath": "auth/signout.tsx"
    },
    "/auth/signup": {
      "filePath": "auth/signup.tsx"
    },
    "/auth/": {
      "filePath": "auth/index.tsx"
    },
    "/inventory/": {
      "filePath": "inventory/index.tsx"
    },
    "/user/": {
      "filePath": "user/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
