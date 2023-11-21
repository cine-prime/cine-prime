import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ListarUsersService {
    async execute(_req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                include: {
                    tickets: true,
                },
            });

            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
