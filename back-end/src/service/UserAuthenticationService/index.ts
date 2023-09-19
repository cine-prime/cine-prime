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
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not exists' });
    }

    if(password !== user.password)res.status(400).json({ error: 'Password not match' });

    const token = sign({
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      },
      'secret',
      {
        expiresIn: '1d',
      },
    );

    return res.json({ token });
  }
}