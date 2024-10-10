import validator from 'validator'
import { IUser } from '../../models/user'
import { badRequest, created, serverError } from '../helpers'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { CreateUserParams, ICreateUserRepository } from './protocols'

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      const requiredFields = ['name', 'email', 'password', 'repeatPassword']

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required.`)
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email)

      if (!emailIsValid) {
        return badRequest('E-mail is invalid.')
      }

      const { password, repeatPassword } = httpRequest.body!

      if (password.length < 6) {
        return badRequest('The password must be at least 6 characters long.')
      }

      if (password.length > 20) {
        return badRequest('The password must have a maximum of 6 characters.')
      }

      if (password !== repeatPassword) {
        return badRequest('The password and repeatPassword must be the same.')
      }

      const newUser = await this.createUserRepository.createUser(
        httpRequest.body
      )

      return created<IUser>(newUser)
    } catch {
      return serverError()
    }
  }
}
