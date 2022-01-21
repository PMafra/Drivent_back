import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import * as roomService from "../../services/client/room";

export async function getRoomInfos(req: Request, res: Response) {
  const roomInfo = await roomService.getRoomInfos();

  if(!roomInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(roomInfo).status(httpStatus.OK);
}

export async function updateTicketRoom(req: Request, res: Response, next: NextFunction) {
  const { roomId } = req.body;
  const { userId } = req.params;

  try {
    if (!userId || !roomId) return res.sendStatus(400);
    await roomService.updateticketRoom(Number(userId), roomId);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}
