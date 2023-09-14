import { Request, Response } from "express";

import { CreateUserService } from "../service/UserService/CreateUserService";

interface IUser {
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  password: string;
}

export class CreateUserController {
  async store(req: Request, res: Response) {
    const { nome, cpf, email, telefone, password }: IUser = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute(
      { email, nome, cpf, telefone, password },
      req,
      res
    );

    return user;
  }
}
