import {
  AddContactParams,
  IAddContactRepository,
} from '../../controller/add-contact/protocols'
import { knex } from '../../database/connection'
import { RequestCustom } from '../../middlewares/verifyLogin'
import { IContact } from '../../models/user'

export class PgAddContactRepository implements IAddContactRepository {
  async addContact(params: AddContactParams): Promise<IContact> {
    const { email } = params

    const contactToBeAdded = await knex('users').where({ email }).first()

    if (!contactToBeAdded) {
      throw new Error('User not found.')
    }

    const allContacts = params.user.contacts
    const contactAlreadyExists = allContacts?.filter((contact) => {
      return email === contact.email
    })

    if (contactAlreadyExists) {
      throw new Error('Contact already added.')
    }

    const newContact = await knex('contacts')
      .insert({ email, name: contactToBeAdded.name, user_id: params.user.id })
      .returning('*')

    await knex('contacts')
      .insert({
        email: params.user.email,
        name: params.user.email,
        user_id: contactToBeAdded.id,
      })
      .returning('*')

    return newContact[0]
  }
}
