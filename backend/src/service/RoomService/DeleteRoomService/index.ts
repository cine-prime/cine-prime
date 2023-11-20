import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteRoomService {
  async execute( req: Request, res: Response) {
    const { id } = req.params;
    
    const room = await prisma.room.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (room){
      await prisma.room.delete({
        where: {
          id: Number(id),
        },
      });
    } else {
      return res.json({ Message: "Sala inexistente" });
    }

    return res.json({ Message: "Sala removida com sucesso!" });
  }
}