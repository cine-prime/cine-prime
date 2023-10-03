import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cpfCinemaOwner = "12345678945";

interface IUser {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  password: string;
}

export class CreateUserService {
  async execute({ nome, cpf, email, telefone, password }: IUser, req: Request, res: Response) {

    if (!nome || !cpf || !email || !telefone || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return res.status(400).json({ message: "CPF inválido, preencha somente os 11 números, sem pontuações ou espaços" });
    }

    const userExiste = await prisma.user.findFirst({
      where: {
        cpf,
      },
    });

    if (userExiste) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de email inválido, siga o formato user@mail.com" });
    }

    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      return res.status(400).json({ message: "Formato de telefone inválido, siga exatemente o formato (85) 99292-9292" });
    }

    const emailExiste = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailExiste) {
      return res.status(400).json({ message: "Email já existe" });
    }

    //const hashedPassword = await bcrypt.hash(password, 10); // Aplicar hash na senha

    let user = await prisma.user.create({
      data: {
        nome,
        cpf,
        email,
        telefone,
        password: password,
      },
    });

    if (cpf === cpfCinemaOwner) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isAdmin: true
        },
      });
    }

    return res.status(201).json(user);
  };
}