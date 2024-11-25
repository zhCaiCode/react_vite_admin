import { proxy, useSnapshot } from 'valtio'

export function createStore<T extends object>(initialState: T) {
  const store = proxy<T>(initialState)
  const useStore = () => useSnapshot(store)
  return [store, useStore] as const
}
