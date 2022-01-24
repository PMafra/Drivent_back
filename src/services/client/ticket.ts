import Ticket from "../../entities/Ticket";
import TicketInterface from "@/interfaces/ticket";

export async function getTicketInfos(userId: number) {
  return await Ticket.getTicketInfos(userId);
}

export async function postTicketInfos(ticket: TicketInterface) {
  await Ticket.postTicketInfos(ticket);
}
