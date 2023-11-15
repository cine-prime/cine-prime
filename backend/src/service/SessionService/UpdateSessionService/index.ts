import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IRoom {
  qtd_max: number;
  typeExhibitionAccepted: string;
}

export class UpdateRoomService {
    async execute({ qtd_max, typeExhibitionAccepted }: IRoom, req: Request, res: Response) {
  
      const { id } = req.params;
  
      if (!qtd_max || !typeExhibitionAccepted) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }
  
      const roomExiste = await prisma.room.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!roomExiste) {
        return res.status(400).json({ message: "Sala não existe" });
      }
  
      let room = await prisma.room.update({
        where: {
          id: Number(id),
        },
        data: {
          qtd_max,
          typeExhibitionAccepted
        },
      });
      return res.status(201).json(room);
    };
  }