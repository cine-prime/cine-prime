import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IMovie {
    name: string;
    genre: string;
    duration: number;
    classification: string;
    synopsis: string;
}

export class CreateMovieService {
    async execute(
        { name, genre, duration, classification, synopsis }: IMovie,
        req: Request,
        res: Response,
    ) {
        if (!name || !genre || !duration || !classification || !synopsis) {
            return res
                .status(400)
                .json({ message: 'Preencha todos os campos' });
        }
        try {
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
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
