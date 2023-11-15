import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ISession {
  dateTime: Date;
  exibitionType: string;
  dublingType: string;
  idRoom: number;
  idFilm: number;
}

export class UpdateSessionService {
    async execute({ dateTime, exibitionType, dublingType, idFilm, idRoom }: ISession, req: Request, res: Response) {
  
      const { id } = req.params;
  
      if (
        !dateTime || 
        !exibitionType || 
        !dublingType ||
        ! idFilm ||
        ! idRoom
        ) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }
  
      const sessionExiste = await prisma.session.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!sessionExiste) {
        return res.status(400).json({ message: "Sessão não existe" });
      }
  
      let session = await prisma.session.update({
        where: {
          id: Number(id),
        },
        data: {
          dateTime,
          exibitionType,
          dublingType,
          idFilm,
          idRoom
        },
      });
      return res.status(201).json(session);
    };
  }