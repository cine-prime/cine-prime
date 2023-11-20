import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

interface IUser {
    email: string;
    password: string;
}

export class UserAuthenticationService {
    async execute({ email, password }: IUser, req: Request, res: Response, next: NextFunction) {
        // console.log(email);
        // console.log(password);
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }
        try {
            let user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                return res.status(400).json({ message: 'Usuário não existe no sistema' });
            }

            if (password !== user.password) return res.status(400).json({ message: 'Senha incorreta' });
            console.log(user);
            const token = sign(
                {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SECRET!,
            );

            user.password = '';

            return res.status(200).json({ user: { token: token, ...user } });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
