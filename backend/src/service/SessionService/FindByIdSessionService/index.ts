import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ISession {
    id: number;
}
export class FindSessionByIdService {
    async execute({id}:ISession,req: Request, res: Response ) {
        const sessionExists = await prisma.session.findUnique({
            where: {
                id: id,
            },
        });
        return res.status(200).json(sessionExists);
    }
}