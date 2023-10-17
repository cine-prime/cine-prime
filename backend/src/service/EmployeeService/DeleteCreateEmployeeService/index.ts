import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteEmployeeService {
  async execute(req: Request, res: Response) {
    const userId = req.body.userId;
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: 'Id requerido' })
    }

    try {
      const checkedAdmin = await prisma.user.findFirst({
        where: {
          id: userId,
          isAdmin: true,
        }
      })
      if (!checkedAdmin && id !== userId) {
        return res.status(401).json({ message: 'Sem autorização' })
      }

      const userExiste = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (!userExiste) {
        return res.status(400).json({ message: "Usuário não existe" });
      }

      await prisma.user.delete({
        where: {
          id,
        },
      });

      return res.json({ Message: "Funcionário deletado com sucesso" });

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }
}
