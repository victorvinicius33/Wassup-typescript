import { ILoggedUserData } from '../../models/user'

export interface LoginParams {
  email: string
  password: string
}

export interface ILoginRepository {
  login(params: LoginParams): Promise<ILoggedUserData>
}
