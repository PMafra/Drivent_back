import { getRepository } from "typeorm";
import Room from "../../entities/Room";
import Ticket from "../../entities/Ticket";

export async function getRoomInfos() {
  return await Room.getRoomInfos();
}

export async function updateticketRoom(userId: number, roomId: number) {
  return await Ticket.updateTicketRoom(userId, roomId);
}
