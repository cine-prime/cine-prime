import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IMovie {
    id: number;
    name: string;
    genre: string;
    duration: number;
    classification: string;
    synopsis: string;
}

export class UpdateMovieService {
    async execute({ name, genre, duration, classification, synopsis }: IMovie, req: Request, res: Response) {
  
      const { id } = req.params;
  
      if (!name || !genre || !duration || !classification || !synopsis) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }
  
      const movieExiste = await prisma.movie.findFirst({
        where: {
          name,
        },
      });
  
      if (!movieExiste) {
        return res.status(400).json({ message: "Filme não existe" });
      }
  
      let movie = await prisma.movie.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          genre,
          duration,
          classification,
          synopsis
        },
      });
      return res.status(201).json(movie);
    };
  }