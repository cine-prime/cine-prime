import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ITicket {
    type: string;
}

export class UpdateTicketService {
    async execute({ type }: ITicket, req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id não informado' });
        }
        try {
            const ticketExiste = await prisma.ticket.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!ticketExiste) {
                return res.status(400).json({ message: 'Ingresso não existe' });
            }

            let ticket = await prisma.ticket.update({
                where: {
                    id: Number(id),
                },
                data: {
                    type,
                },
                include: {
                    session: true,
                    user: true,
                },
            });
            return res.status(200).json(ticket);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
