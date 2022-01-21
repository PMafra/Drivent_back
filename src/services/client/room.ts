import { getRepository } from "typeorm";
import Room from "../../entities/Room";
import Ticket from "../../entities/Ticket";

export async function getRoomInfos() {
  return await Room.getRoomInfos();
}

export async function updateticketRoom(userId: number, roomId: number) {
  const ticket = await Ticket.getTicketInfos(userId);

  if (ticket[0].roomId) {
    await Room.updateRoomInfo(ticket[0].roomId, -1);
  }
  await Room.updateRoomInfo(roomId, +1);

  return await Ticket.updateTicketRoom(userId, roomId);
}
