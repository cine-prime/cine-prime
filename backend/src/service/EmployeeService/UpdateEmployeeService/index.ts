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

export class UpdateEmployeeService {
  async execute(req: Request, res: Response) {
    const { nome, cpf, email, telefone }: IEmployee = req.body;
    const id = Number(req.params.id);
    const userId = req.body.userId;

    if (!id) {
      return res.status(400).json( {message: 'Id requerido'} )
    }

    try {
      const checkedAdmin = await prisma.user.findFirst({
        where: {
          id: userId,
          isAdmin: true,
        }
      })
      if (!checkedAdmin && id !== userId) { // Se o usuário que fez a requisição não for o Dono, ou um Employee está tentendo editar/excluir
        return res.status(401).json({ message: 'Sem autorização' }) // outro Employee, resultará em Sem autorização.
      }

      if (!nome || !cpf || !email || !telefone) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }

      const userExiste = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (!userExiste) {
        return res.status(400).json({ message: "Usuário não existe" });
      }

      const checkEmail = await prisma.user.findFirst({
        where: {
          email,
        },
      }) as any;
      if (checkEmail !== null && checkEmail.id !== id) {
        return res.status(400).json({ message: "Já existe outro usuário com o email informado" });
      }

      const checkCpf = await prisma.user.findFirst({
        where: {
          cpf,
        },
      }) as any;
      if (checkCpf !== null && checkCpf.id !== id) {
        return res.status(400).json({ message: "Já existe outro usuário com o cpf informado" });
      }

      let employee = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          nome,
          cpf,
          email,
          telefone,
        },
      });

      return res.status(201).json(employee);

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }
}
