import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ISession {
    id: number;
}
export class FindSessionByIdService {
    async execute({ id }: ISession, req: Request, res: Response) {
        if (!id) {
            return res.status(400).json({ message: 'Id não informado' });
        }
        try {
            const sessionExists = await prisma.session.findUnique({
                where: {
                    id: id,
                },
                include: {
                    room: true,
                    movie: true,
                },
            });
            return res.status(200).json(sessionExists);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
