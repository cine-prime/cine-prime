import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteTicketService {
    async execute(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.json({ Message: 'Id não informado' });
        }
        try {
            const ticket = await prisma.ticket.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (ticket) {
                await prisma.ticket.delete({
                    where: {
                        id: Number(id),
                    },
                });

                const session = await prisma.session.findUnique({
                    where: { id: ticket.idSession },
                });
                if (!session) {
                    return res.status(400).json({ Message: 'Sessão inexistente' });
                }
                prisma.session.update({
                    where: { id: session.id },
                    data: {
                        atualTicketsQtd: session.atualTicketsQtd + 1,
                    },
                });
            } else {
                return res.status(400).json({ Message: 'Ingresso inexistente' });
            }

            return res.status(200).json({ Message: 'Ingresso removido com sucesso!' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
