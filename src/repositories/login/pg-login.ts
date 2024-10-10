import jwt from 'jsonwebtoken'
import { ILoggedUserData } from '../../models/user'
import { knex } from '../../database/connection'
import bcrypt from 'bcrypt'
import { ILoginRepository, LoginParams } from '../../controller/login/protocols'

export class PgLoginRepository implements ILoginRepository {
  async login(params: LoginParams): Promise<ILoggedUserData> {
    const { email, password } = params

    const user = await knex('users').where('email', email).first()
    if (!user) {
      throw new Error('Incorrect E-mail or password.')
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
      throw new Error('Incorrect E-mail or password')
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', {
      expiresIn: '8h',
    })

    const allContacts = await knex('contacts')
      .where({ user_id: user.id })
      .returning('*')

    const { password: _, ...userData } = user

    return {
      user: userData,
      contacts: allContacts,
      token,
    }
  }
}
