import { Request, Response } from "express";

import { CreateSessionService } from "../service/SessionService/CreateSessionService";
import { DeleteSessionService } from "../service/SessionService/DeleteSessionService";
import { ListSessionsService } from "../service/SessionService/FindAllSessionsService";
import { FindSessionByIdService } from "../service/SessionService/FindByIdSessionService";
import { UpdateSessionService } from "../service/SessionService/UpdateSessionService";

interface ISession {
	dateTime: Date;
	exibitionType: string;
	dublingType: string;
	idRoom: number;
	idFilm: number;
	atualTicketsQtd: number,
	maxTicketsQtd: number
}

export class CreateSessionController {
	async store(req: Request, res: Response) {
		const { dateTime, exibitionType, dublingType, idFilm, idRoom, atualTicketsQtd, maxTicketsQtd }: ISession = req.body;
		const createSessionService = new CreateSessionService();

		const session = await createSessionService.execute(
			{
				dateTime,
				exibitionType,
				dublingType,
				idFilm,
				idRoom,
				atualTicketsQtd, 
				maxTicketsQtd
			},
			req,
			res
		);

		return session;
	}
}

export class ListSessionsController {
	async index(req: Request, res: Response) {

		const listSessionsService = new ListSessionsService();

		const session = await listSessionsService.execute(
			req,
			res
		);

		return session;
	}
}

export class UpdateSessionController {
	async update(req: Request, res: Response) {
		const { id } = req.params;
		const {
			dateTime,
			exibitionType,
			dublingType,
			idFilm,
			idRoom,
			atualTicketsQtd, 
			maxTicketsQtd
		}: ISession = req.body;

		const updateSessionService = new UpdateSessionService();

		const session = await updateSessionService.execute(
			{
				dateTime,
				exibitionType,
				dublingType,
				idFilm,
				idRoom,
				atualTicketsQtd, 
				maxTicketsQtd
			},
			req,
			res
		);

		return session;
	}
}

export class FindSessionByIdController {
	async find(req: Request, res: Response) {
		const { id } = req.params;

		const findSessionByIdService = new FindSessionByIdService();

		const session = await findSessionByIdService.execute(
			{ id: Number(id) },
			req,
			res
		);

		return session;
	}
}

export class DeleteSessionController {
	async delete(req: Request, res: Response) {

		const deleteSessionService = new DeleteSessionService();

		const session = await deleteSessionService.execute(
			req,
			res
		);

		return session;
	}
}











