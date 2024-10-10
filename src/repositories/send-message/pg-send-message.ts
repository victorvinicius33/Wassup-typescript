import {
  ISendMessageRepository,
  SendMessageParams,
} from '../../controller/send-message/protocols'
import { knex } from '../../database/connection'
import { IChat } from '../../models/chat'

export class PgSendMessageRepository implements ISendMessageRepository {
  async sendMessage(params: SendMessageParams): Promise<IChat> {
    const { room, sent_by, received_by, message_data } = params

    const messageSent = await knex('message_data')
      .insert({
        sent_by,
        received_by,
        message_data,
        room_id: room,
        time_sent: new Date(Date.now()),
      })
      .returning('*')

    if (!messageSent) {
      throw new Error('Message not sent.')
    }

    const { ...sucessMessageSent } = messageSent[0]

    return sucessMessageSent
  }
}
