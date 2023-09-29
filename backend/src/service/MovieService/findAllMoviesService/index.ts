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

export class ListarMoviesService {
    async execute(_req: Request, res: Response){
        // const movies = []
        const movies = await prisma.movie.findMany();
        return res.json(movies);
    }
}