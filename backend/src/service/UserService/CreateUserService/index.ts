import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    password: string;
}

export class CreateUserService {
    validateCpf(value: string): boolean {
        const cpfLimpo = value.replace(/[^\d]/g, '');

        if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
            return false;
        }

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
        }

        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpfLimpo.charAt(9))) {
            return false;
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
        }

        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        return resto === parseInt(cpfLimpo.charAt(10));
    }

    async execute({ nome, cpf, email, telefone, password }: IUser, req: Request, res: Response) {
        if (!nome || !cpf || !email || !telefone || !password) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpf) || !this.validateCpf(cpf)) {
            //colocar o ||

            return res.status(400).json({ message: 'CPF inválido, preencha um CPF valido com 11 números, sem pontuações ou espaços' });
        }
        try {
            const userExiste = await prisma.user.findFirst({
                where: {
                    cpf,
                },
            });

            if (userExiste) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Formato de email inválido, siga o formato user@mail.com' });
            }

            const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
            if (!telefoneRegex.test(telefone)) {
                return res.status(400).json({ message: 'Formato de telefone inválido, siga exatemente o formato (85) 99292-9292' });
            }

            const emailExiste = await prisma.user.findFirst({
                where: {
                    email,
                },
            });

            if (emailExiste) {
                return res.status(400).json({ message: 'Email já existe' });
            }

            //const hashedPassword = await bcrypt.hash(password, 10); // Aplicar hash na senha

            let user = await prisma.user.create({
                data: {
                    nome,
                    cpf,
                    email,
                    telefone,
                    password: password,
                },
            });

            if (cpf === process.env.CPF_CINEMA_OWNER) {
                user = await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        isAdmin: true,
                        profile: 'employee',
                    },
                });
            }

            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
