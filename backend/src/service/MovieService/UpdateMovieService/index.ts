import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IMovie {
	id: number;
	name: string;
	genre: string;
	duration: number;
	classification: string;
	synopsis: string;
}

export class UpdateMovieService {
	async execute({ name, genre, duration, classification, synopsis }: IMovie, req: Request, res: Response) {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: 'Id não informado' });
		}

		if (!name || !genre || !duration || !classification || !synopsis) {
			return res.status(400).json({ message: 'Preencha todos os campos' });
		}
		try {
			const movieExiste = await prisma.movie.findFirst({
				where: {
					id: Number(id),
				},
			});

			if (!movieExiste) {
				return res.status(400).json({ message: 'Filme não existe' });
			}

			let movie = await prisma.movie.update({
				where: {
					id: Number(id),
				},
				data: {
					name,
					genre,
					duration,
					classification,
					synopsis,
				},
				include: {
					sessions: true,
				},
			});
			return res.status(201).json(movie);
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}
}
