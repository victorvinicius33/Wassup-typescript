import { Router, Request, Response } from 'express'
import { CreateUserController } from './controller/create-user/create-user'
import { PgCreateUserRepository } from './repositories/create-user/pg-create-user'
import { PgLoginRepository } from './repositories/login/pg-login'
import { LoginController } from './controller/login/login'

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

export default routes
