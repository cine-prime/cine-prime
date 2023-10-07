import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


interface IMovie {
    name: string;
    genre: string;
    duration: number;
    classification: string;
    synopsis: string;
}

export class CreateMovieService {
    async execute({ name, genre, duration, classification, synopsis }: IMovie, req: Request, res: Response) {
        let movie = await prisma.movie.create({
            data: {
                name,
                genre,
                duration,
                classification,
                synopsis,
            },
        });
        return res.status(201).json(movie);

    }
}