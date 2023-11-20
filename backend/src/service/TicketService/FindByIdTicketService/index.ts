import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ITicket {
    id: number;
}
export class FindTicketByIdService {
    async execute({ id }: ITicket, req: Request, res: Response) {
        if (!id) {
            return res.status(400).json({ message: 'Id não informado' });
        }
        try {
            const ticketExists = await prisma.ticket.findUnique({
                where: {
                    id: id,
                },
                include: {
                    session: true,
                    user: true,
                },
            });
            return res.status(200).json(ticketExists);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
