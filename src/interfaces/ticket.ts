interface TicketInterface {
  isPaid: boolean;
  userId: number;
  modalityId: number;
  roomId?: number;
}

export default TicketInterface;
