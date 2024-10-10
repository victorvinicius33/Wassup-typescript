import { IContact } from '../../models/user'
import { created, serverError } from '../helpers'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { AddContactParams, IAddContactRepository } from './protocols'

export class AddContactController implements IController {
  constructor(private readonly addContactRepository: IAddContactRepository) {}

  async handle(
    httpRequest: HttpRequest<AddContactParams>
  ): Promise<HttpResponse<IContact | string>> {
    try {
      const newContact = await this.addContactRepository.addContact(
        httpRequest.body
      )

      return created<IContact>(newContact)
    } catch {
      return serverError()
    }
  }
}
