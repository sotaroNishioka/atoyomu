export type TemporarilyRegister = {
  email: string
  isEnabled: boolean
  expiredAt: Date
  createdAt: Date
  updatedAt: Date
}

export type Users = {
  uid: string
  displayName: string
  email: string
  photoURL: string
  lastLoginedAt: Date
  updatedAt: Date
  createdAt: Date
}
