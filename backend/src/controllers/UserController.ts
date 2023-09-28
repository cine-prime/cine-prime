import { Request, Response } from "express";

import { CreateUserService } from "../service/UserService/CreateUserService";
import { DeleteUserService } from "../service/UserService/DeleteUserService";
import { ListarUsersService } from "../service/UserService/FindAllUsersService";
import { FindUserByEmailService } from "../service/UserService/FindUserByEmailService";
import { UpdateUserService } from "../service/UserService/UpdateUserService";
import { FindUserByIdService } from "../service/UserService/FindUserByIdService";

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

export class DeleteUserController {
  async delete(req: Request, res: Response) {

    const deleteUserService = new DeleteUserService();

    const user = await deleteUserService.execute(
      req,
      res
    );

    return user;
  }
}

export class ListarUsersController {
  async index(req: Request, res: Response) {

    const listarUserService = new ListarUsersService();

    const user = await listarUserService.execute(
      req,
      res
    );

    return user;
  }
}

export class ListarUsersEmailController {
  async listarUsers(req: Request, res: Response) {

    const { email } = req.body;

    const findUserByEmailService = new FindUserByEmailService();

    const user = await findUserByEmailService.execute(
      { email: String(email) },
      req,
      res
    );

    return user;
  }
}

export class UpdateUserController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, cpf, email, telefone, password }: IUser = req.body;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute(
      { id: Number(id), email, nome, cpf, telefone, password },
      req,
      res
    );

    return user;
  }
}

export class findUserById {
  async find(req: Request, res: Response) {
    const { id } = req.params;

    const findUserByIdService = new FindUserByIdService();

    const user = await findUserByIdService.execute(
      { id: Number(id) },
      req,
      res
    );

    return user;
  }
}