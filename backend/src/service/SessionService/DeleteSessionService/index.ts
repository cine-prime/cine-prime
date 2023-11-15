import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteSessionService {
  async execute( req: Request, res: Response) {
    const { id } = req.params;
    
    const session = await prisma.session.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (session){
      await prisma.session.delete({
        where: {
          id: Number(id),
        },
      });
    } else {
      return res.json({ Message: "Sessão inexistente" });
    }

    return res.json({ Message: "Sessão removida com sucesso!" });
  }
}