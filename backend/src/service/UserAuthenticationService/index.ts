import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

interface IUser {
  email: string;
  password: string;
}

export class UserAuthenticationService {
  async execute({email, password}: IUser,
    req: Request, res: Response, next: NextFunction ) {

    if(!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não existe no sistema' });
    }

    if(password !== user.password) return res.status(400).json({ message: 'Senha incorreta' });

    const token = sign({
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      },
      'secret',
    );

    user.password = ''

    return res.status(200).json({ user: {token: token, ...user} });
  }
}