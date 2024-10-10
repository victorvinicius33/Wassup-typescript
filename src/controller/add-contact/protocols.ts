import { RequestCustom } from '../../middlewares/verifyLogin'
import { IContact } from '../../models/user'

export interface AddContactParams extends RequestCustom {
  email: string
}

export interface IAddContactRepository {
  addContact(params: AddContactParams): Promise<IContact>
}
