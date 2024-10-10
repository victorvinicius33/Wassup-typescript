import { ILoggedUserData } from '../../models/user'

export interface loginParams {
  email: string
  password: string
}

export interface ILoginRepository {
  login(params: loginParams): Promise<ILoggedUserData>
}
