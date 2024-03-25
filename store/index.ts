import { enableStaticRendering } from 'mobx-react-lite'
import UserInfoStore from './UserInfo'

enableStaticRendering(typeof window === 'undefined')

let clientStore: any

const initStore = (initData?: any) => {
  const store = clientStore ?? new UserInfoStore()
  if (initData?.userInfoStore) store.hydrate(initData.userInfoStore)

  if (typeof window === 'undefined') return store
  if (!clientStore) clientStore = store
  return store
}

export function useStore(initData?: any) {
  return initStore(initData)
}
