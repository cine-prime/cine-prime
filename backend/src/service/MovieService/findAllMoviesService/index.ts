import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ListarMoviesService {
    async execute(_req: Request, res: Response) {
        try {
            const movies = await prisma.movie.findMany({
                include: {
                    sessions: true,
                },
            });
            return res.status(200).json(movies);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
