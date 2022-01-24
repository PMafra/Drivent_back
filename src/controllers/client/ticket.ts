import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "../../services/client/ticket";

export async function getTicketInfos(req: Request, res: Response) {
  const ticketInfo = await ticketService.getTicketInfos(req.user.id);

  if(!ticketInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  return res.send(ticketInfo).status(httpStatus.OK);
}

export async function confirmPayment(req: Request, res: Response) {
  try { 
    await ticketService.confirmPayment(req.user.id);
    return res.sendStatus(httpStatus.OK);
  } catch {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
