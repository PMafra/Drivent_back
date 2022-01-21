import Ticket from "../../entities/Ticket";

export async function getTicketInfos(userId: number) {
  return await Ticket.getTicketInfos(userId);
}
