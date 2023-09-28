import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IUser {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  password: String;
}

export class UpdateUserService {
  async execute({ nome, cpf, email, telefone, password }: IUser, req: Request, res: Response) {

    const { id } = req.params;

    if (!nome || !cpf || !email || !telefone || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const userExiste = await prisma.user.findFirst({
      where: {
        cpf,
      },
    });

    if (!userExiste) {
      return res.status(400).json({ message: "Usuário não existe" });
    }

    let user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        cpf,
        email,
        telefone,
        password: String(password)
      },
    });
    return res.status(201).json(user);
  };
}