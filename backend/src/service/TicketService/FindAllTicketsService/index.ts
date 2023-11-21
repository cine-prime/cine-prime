import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ListTicketsService {
    async execute(_req: Request, res: Response) {
        try {
            const tickets = await prisma.ticket.findMany({
                include: {
                    session: true,
                    user: true,
                },
            });
            return res.status(200).json(tickets);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
