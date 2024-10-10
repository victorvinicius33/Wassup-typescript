import { IChat } from '../../models/chat'
import { created, serverError } from '../helpers'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { ISendMessageRepository, SendMessageParams } from './protocols'

export class SendMessageController implements IController {
  constructor(private readonly sendMessageRepository: ISendMessageRepository) {}

  async handle(
    httpRequest: HttpRequest<SendMessageParams>
  ): Promise<HttpResponse<IChat | string>> {
    try {
      const sendMessage = await this.sendMessageRepository.sendMessage(
        httpRequest.body
      )
      return created<IChat>(sendMessage)
    } catch {
      return serverError()
    }
  }
}
