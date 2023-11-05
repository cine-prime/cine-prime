import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Token not found" });
  }

  const token = authorization;
  const regex = /^Bearer\s+/;
  const resultToken = token.replace(regex, "");

  try {
    const decodedData = verify(resultToken, process.env.JWT_SECRET!) as {
      id: number;
    };
    req.body.userId = decodedData.id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}
