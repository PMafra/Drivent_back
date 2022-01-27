import Activity from "../entities/Activity";

interface TicketInterface {
  isPaid: boolean;
  userId: number;
  modalityId: number;
  roomId?: number;
  activities?: Activity[];
}

export default TicketInterface;
