import { badRequest, ok, serverError } from '../../controller/helpers'
import {
  HttpRequest,
  HttpResponse,
  IController,
} from '../../controller/protocols'
import { LoginParams, ILoginRepository } from './protocols'
import { ILoggedUserData } from '../../models/user'
import validator from 'validator'

export class LoginController implements IController {
  constructor(private readonly loginRepository: ILoginRepository) {}

  async handle(
    httpRequest: HttpRequest<LoginParams>
  ): Promise<HttpResponse<ILoggedUserData | string>> {
    const { email, password } = httpRequest.body

    try {
      if (!email) {
        return badRequest('E-mail is required.')
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email)

      if (!emailIsValid) {
        return badRequest('E-mail is invalid.')
      }

      if (!password) {
        return badRequest('Password is required.')
      }

      const userData = await this.loginRepository.login(httpRequest.body)
      return ok<ILoggedUserData>(userData)
    } catch (error) {
      return serverError()
    }
  }
}
