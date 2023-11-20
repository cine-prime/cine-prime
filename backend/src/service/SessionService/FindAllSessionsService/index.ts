import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ISession {
    dateTime: Date;
    exibitionType: string;
    dublingType: string;
    idRoom: number;
    idFilm: number;
}

export class ListSessionsService {
    async execute(_req: Request, res: Response){
        const sessions = await prisma.session.findMany();
        return res.json(sessions);
    }
}