import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ITicket {
    idUser: number;
    idSession: number;
    type: string;
}

export class CreateTicketService {
    async execute({ idUser, idSession, type }: ITicket, req: Request, res: Response) {
        if (!idUser || !idSession || !type) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }
        try {
            const [sessionExists, userExists] = await Promise.all([
                prisma.session.findUnique({
                    where: { id: idSession },
                }),
                prisma.user.findUnique({
                    where: { id: idSession },
                }),
            ]);

            if (!sessionExists) {
                return res.status(400).json({ message: 'Sessão não existe' });
            }
            if (!userExists) {
                return res.status(400).json({ message: 'Usuário não existe' });
            }

            if (sessionExists.atualTicketsQtd === sessionExists.maxTicketsQtd) {
                return res.status(400).json({ message: 'Sessão lotada' });
            }

            let ticket = await prisma.ticket.create({
                data: {
                    idUser,
                    idSession,
                    type,
                },
            });
            await prisma.session.update({
                where: { id: idSession },
                data: {
                    atualTicketsQtd: sessionExists.atualTicketsQtd + 1,
                },
            });
            return res.status(201).json(ticket);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
