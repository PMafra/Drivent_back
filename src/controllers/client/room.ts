import { Request, Response } from "express";
import httpStatus from "http-status";

import * as roomService from "../../services/client/room";

export async function getRoomInfos(req: Request, res: Response) {
  const roomInfo = await roomService.getRoomInfos();

  if(!roomInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(roomInfo).status(httpStatus.OK);
}
