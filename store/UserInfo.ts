import { makeAutoObservable } from 'mobx'

type UserInfo = { email: string }

class UserInfoStore {
  userInfo: UserInfo = { email: '' }
  constructor(email: string = '') {
    if (typeof localStorage !== 'undefined') {
      const storageUserInfoStr = localStorage.getItem('userInfo')
      if (storageUserInfoStr) {
        this.userInfo = JSON.parse(storageUserInfoStr)
        window.addEventListener('beforeunload', handleBeforeUnload)
      }
    } else {
      this.userInfo = { email }
    }
    makeAutoObservable(this)
  }

  setUserInfo = (value: UserInfo) => {
    if (value.email && typeof localStorage !== 'undefined') {
      localStorage.setItem('userInfo', JSON.stringify(value))
      window.addEventListener('beforeunload', handleBeforeUnload)
    }
    this.userInfo = value
  }

  isAdmin = () => {
    return this.userInfo.email === '13641039885@163.com'
  }
}

function handleBeforeUnload(e: any) {
  // @ts-ignore
  if (UserInfoStore?.userInfo?.email && typeof localStorage !== 'undefined') {
    // @ts-ignore
    localStorage.setItem('userInfo', JSON.stringify(UserInfoStore.userInfo))
  }
  window.removeEventListener('beforeunload', handleBeforeUnload)
}

export default UserInfoStore
