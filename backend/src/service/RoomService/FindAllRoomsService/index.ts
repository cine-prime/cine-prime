import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ListRoomsService {
    async execute(_req: Request, res: Response) {
        try {
            const rooms = await prisma.room.findMany({
                include: {
                    sessions: true,
                },
            });
            return res.status(200).json(rooms);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
