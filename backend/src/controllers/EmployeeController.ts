import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IEmployee {
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  password?: string;
}

export class EmployeeController {
  async store(req: Request, res: Response) {
    const { nome, cpf, email, telefone, password }: IEmployee = req.body;
    const userId = req.body.userId;

    try {
      const checkedAdmin = await prisma.user.findFirst({
        where: {
          id: userId,
          isAdmin: true,
        }
      })
      if (!checkedAdmin) { // Se o usuário que fez a requisição não for o Dono resultará em Sem autorização.
        return res.status(401).json({ message: 'Sem autorização' })
      }

      if (!nome || !cpf || !email || !telefone || !password) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }
  
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        return res.status(400).json({ message: "CPF inválido, preencha somente os 11 números, sem pontuações ou espaços" });
      }

      const userExiste = await prisma.user.findFirst({
        where: {
          cpf,
        },
      });

      if (userExiste) {
        return res.status(400).json({ message: "CPF já existe" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Formato de email inválido, siga o formato user@mail.com" });
      }

      const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!telefoneRegex.test(telefone)) {
        return res.status(400).json({ message: "Formato de telefone inválido, siga exatemente o formato (85) 99292-9292" });
      }

      const emailExiste = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (emailExiste) {
        return res.status(400).json({ message: "Email já existe" });
      }

      //const hashedPassword = await bcrypt.hash(password, 10); // Aplicar hash na senha

      let employee = await prisma.user.create({
        data: {
          nome,
          cpf,
          email,
          telefone,
          password: password,
          profile: 'employee',
        },
      });

      return res.status(201).json(employee);

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }

  async index(req: Request, res: Response) {
    try {
      let employees = await prisma.user.findMany({
        where: {
          profile: 'employee',
          isAdmin: false,
        }
      }) as any;

      if (employees.length === 0) {
        return res.json({ message: 'Não há funcionários cadastrados'} )
      }
      
      employees = employees.map((employee : any) => {
        const { password, ...rest } = employee
        return rest
      })

      return res.json(employees);

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }

  async find(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json( {message: 'Id requerido'} )
    }

    try {
      const userExists = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!userExists) {
        return res.status(400).json({ message: 'Não há funcionário com o id informado' })
      }

      userExists.password = ''

      return res.status(200).json(userExists);

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }

  async update(req: Request, res: Response) {
    const { nome, cpf, email, telefone }: IEmployee = req.body;
    const id = Number(req.params.id);
    const userId = req.body.userId;

    if (!id) {
      return res.status(400).json( {message: 'Id requerido'} )
    }

    try {
      const checkedAdmin = await prisma.user.findFirst({
        where: {
          id: userId,
          isAdmin: true,
        }
      })
      if (!checkedAdmin && id !== userId) { // Se o usuário que fez a requisição não for o Dono, ou um Employee está tentendo editar/excluir 
        return res.status(401).json({ message: 'Sem autorização' }) // outro Employee, resultará em Sem autorização.
      }

      if (!nome || !cpf || !email || !telefone) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }
      
      const userExiste = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (!userExiste) {
        return res.status(400).json({ message: "Usuário não existe" });
      }

      const checkEmail = await prisma.user.findFirst({
        where: {
          email,
        },
      }) as any;
      if (checkEmail !== null && checkEmail.id !== id) {
        return res.status(400).json({ message: "Já existe outro usuário com o email informado" });
      }

      const checkCpf = await prisma.user.findFirst({
        where: {
          cpf,
        },
      }) as any;
      if (checkCpf !== null && checkCpf.id !== id) {
        return res.status(400).json({ message: "Já existe outro usuário com o cpf informado" });
      }
      
      let employee = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          nome,
          cpf,
          email,
          telefone,
        },
      });
      
      return res.status(201).json(employee);

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    const userId = req.body.userId;
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json( {message: 'Id requerido'} )
    }

    try {
      const checkedAdmin = await prisma.user.findFirst({
        where: {
          id: userId,
          isAdmin: true,
        }
      })
      if (!checkedAdmin && id !== userId) {
        return res.status(401).json({ message: 'Sem autorização' })
      }

      const userExiste = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (!userExiste) {
        return res.status(400).json({ message: "Usuário não existe" });
      }

      await prisma.user.delete({
        where: {
          id,
        },
      });
  
      return res.json({ Message: "Funcionário deletado com sucesso" });

    } catch (error: any) {
      console.log('ERROR ->', error.message);
      return res.status(500).json({ message: error.message })
    }
  }
}
