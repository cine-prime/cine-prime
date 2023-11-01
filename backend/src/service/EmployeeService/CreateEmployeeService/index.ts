import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IEmployee {
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  password?: string;
}

export class CreateEmployeeService {
  async execute(req: Request, res: Response) {
    const { nome, cpf, email, telefone, password }: IEmployee = req.body;
    const userId = req.body.userId;

    try {
      const checkedAdmin = await prisma.user.findFirst({
        where: {
          id: userId,
          isAdmin: true,
        }
      })
      if (!checkedAdmin) { // Se o usuário que fez a requisição não for o Dono resultará em Sem autorização.
        return res.status(401).json({ message: 'Sem autorização' })
      }

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
        return res.status(400).json({ message: "CPF já existe" });
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

      let employee = await prisma.user.create({
        data: {
          nome,
          cpf,
          email,
          telefone,
          password: password,
          profile: 'employee',
        },
      });

      return res.status(201).json(employee);

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }
}
