import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IRoom {
    id: number;
}
export class FindRoomByIdService {
    async execute({ id }: IRoom, req: Request, res: Response) {
        if (!id) {
            return res.status(400).json({ message: 'Id não informado' });
        }
        try {
            const roomExists = await prisma.room.findUnique({
                where: {
                    id: id,
                },
                include: {
                    sessions: true,
                },
            });
            return res.status(200).json(roomExists);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
