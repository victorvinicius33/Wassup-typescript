import {
  CreateUserParams,
  ICreateUserRepository,
} from '../../controller/create-user/protocols'
import { IUser } from '../../models/user'
import { knex } from '../../database/connection'
import bcrypt from 'bcrypt'

export class PgCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<IUser> {
    const { name, email, password } = params

    const emailAlreadyExists = await knex('users').where({ email }).first()

    if (emailAlreadyExists) {
      throw new Error('The E-mail already exists.')
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await knex('users')
      .insert({ name, email, password: hashPassword })
      .returning('*')

    if (!newUser) {
      throw new Error('User not created.')
    }

    const { password: _, ...newUserData } = newUser[0]

    return newUserData
  }
}
