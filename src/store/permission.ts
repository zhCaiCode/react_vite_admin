import { createStore } from './createStore'

export const [permissionStore, usePermission] = createStore<any>({
  routes: [] as any,
  addRoutes: [] as any,
  defaultRoutes: [] as any,
  topbarRouters: [] as any,
  sidebarRouters: [] as any
})
