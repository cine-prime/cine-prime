import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteMovieService {
  async execute( req: Request, res: Response) {
    const { id } = req.params;

    await prisma.movie.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({ Message: "Filme removido com sucesso!" });
  }
}