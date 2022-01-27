import { Request, Response } from "express";
import httpStatus from "http-status";

import * as eventDayService from "../../services/client/eventDay";

export async function getEventDayInfos(req: Request, res: Response) {
  const eventDayInfo = await eventDayService.getEventDayInfos();

  if(!eventDayInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(eventDayInfo).status(httpStatus.OK);
}
