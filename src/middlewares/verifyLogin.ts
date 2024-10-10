import { knex } from '../database/connection'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { notFound, serverError, unauthorized } from '../controller/helpers'
import { HttpResponse } from '../controller/protocols'
import { IContact, IUser } from '../models/user'

type JwtPayload = {
  id: number
}

export interface RequestCustom extends Request {
  user: Omit<IUser, 'password'> & {
    contacts?: IContact[]
  }
}

export const verifyLogin = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
): Promise<HttpResponse<string> | any> => {
  const { authorization } = req.headers

  if (!authorization) {
    return unauthorized(
      'To access this feature a valid authentication token must be sent.'
    )
  }

  try {
    const token: string = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload

    const user: IUser = await knex('users').where({ id }).first()

    if (!user) {
      return notFound('User not found.')
    }

    const { password: _, ...loggedUser } = user
    req.user = loggedUser

    const allUserContacts: IContact[] = await knex('contacts')
      .where({ user_id: loggedUser.id })
      .returning('*')
    req.body.user.contacts = allUserContacts

    next()
  } catch {
    return serverError()
  }
}
