import { IUser } from '../../models/user'

export interface CreateUserParams {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<IUser>
}
