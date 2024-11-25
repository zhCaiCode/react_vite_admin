import { createIcon } from './iconUtils'

export function convertCompatRouters(childrens: any): any[] {
  return childrens.map((item: any) => {
    return {
      path: item.path,
      icon: createIcon(item.meta.icon),
      //  icon: item.meta.icon,
      name: item.meta.title,
      routes: item.children ? convertCompatRouters(item.children) : undefined,
      hideChildrenInMenu: item.hidden,
      hideInMenu: item.hidden,
      component: item.component,
      authority: item.perms
    }
  })
}
