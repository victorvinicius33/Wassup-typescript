import { IChat } from '../../models/chat'

export interface SendMessageParams {
  room: number
  sent_by: string
  received_by: string
  message_data: string
}

export interface ISendMessageRepository {
  sendMessage(params: SendMessageParams): Promise<IChat>
}
