import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FindByIdEmployeeService {
  async execute(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json( {message: 'Id requerido'} )
    }

    try {
      const userExists = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!userExists) {
        return res.status(400).json({ message: 'Não há funcionário com o id informado' })
      }

      userExists.password = ''

      return res.status(200).json(userExists);

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }
}
