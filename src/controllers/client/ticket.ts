import { Request, Response } from "express";
import httpStatus from "http-status";
import TicketInterface from "@/interfaces/ticket";
import * as ticketService from "../../services/client/ticket";
import ConflictError from "@/errors/ConflictError";

export async function getTicketInfos(req: Request, res: Response) {
  const ticketInfo = await ticketService.getTicketInfos(req.user.id);

  if (!ticketInfo) {
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

export async function postTicketInfos(req: Request, res: Response) {
  const ticket = req.body as TicketInterface;
  ticket.isPaid = false;
  try {
    await ticketService.postTicketInfos(ticket);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "QueryFailedError") {
      return res.sendStatus(409);
    }
    return res.sendStatus(500);
  }
}
