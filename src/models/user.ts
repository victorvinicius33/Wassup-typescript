export interface IUser {
  id: number
  name: string
  email: string
  password: string
}

export interface IContact {
  id: number
  name: string
  email: string
  user_id: number
}

export interface ILoggedUserData {
  user: Omit<IUser, 'password'>
  contacts?: IContact[]
  token: string
}
