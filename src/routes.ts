import { Router, Request, Response } from 'express'
import { CreateUserController } from './controller/create-user/create-user'
import { PgCreateUserRepository } from './repositories/create-user/pg-create-user'
import { PgLoginRepository } from './repositories/login/pg-login'
import { LoginController } from './controller/login/login'
import { verifyLogin } from './middlewares/verifyLogin'
import { PgSendMessageRepository } from './repositories/send-message/pg-send-message'
import { SendMessageController } from './controller/send-message/send-message'

const routes = Router()

routes.post('/users', async (req: Request, res: Response) => {
  const pgCreateUserRepository = new PgCreateUserRepository()

  const createUserController = new CreateUserController(pgCreateUserRepository)

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

routes.post('/login', async (req: Request, res: Response) => {
  const pgLoginRepository = new PgLoginRepository()

  const loginController = new LoginController(pgLoginRepository)

  const { body, statusCode } = await loginController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

routes.use(verifyLogin)

routes.get('/user', async (req: Request, res: Response) => {
  res.status(200).json(req.body.user)
})

routes.post('/chat', async (req: Request, res: Response) => {
  const pgSendMessageRepository = new PgSendMessageRepository()

  const sendMessageController = new SendMessageController(
    pgSendMessageRepository
  )

  const { body, statusCode } = await sendMessageController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

export default routes
