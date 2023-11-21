import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ISession {
    dateTime: Date;
    exibitionType: string;
    dublingType: string;
    idRoom: number;
    idMovie: number;
}

export class ListSessionsService {
    async execute(_req: Request, res: Response) {
        try {
            const sessions = await prisma.session.findMany({
                include: {
                    room: true,
                    movie: true,
                },
            });
            return res.status(200).json(sessions);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
