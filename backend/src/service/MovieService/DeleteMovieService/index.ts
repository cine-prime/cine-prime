import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteMovieService {
  async execute( req: Request, res: Response) {
    const { id } = req.params;
    
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (movie){
      await prisma.movie.delete({
        where: {
          id: Number(id),
        },
      });
    } else {
      return res.json({ Message: "Filme inexistente" });
    }

    return res.json({ Message: "Filme removido com sucesso!" });
  }
}