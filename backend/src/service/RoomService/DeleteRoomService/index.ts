import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteRoomService {
    async execute(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ Message: 'Id não informado' });
        }
        try {
            const room = await prisma.room.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (room) {
                await prisma.room.delete({
                    where: {
                        id: Number(id),
                    },
                });
            } else {
                return res.status(400).json({ Message: 'Sala inexistente' });
            }

            return res.status(200).json({ Message: 'Sala removida com sucesso!' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
