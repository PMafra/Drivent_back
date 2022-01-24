import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import Modality from "./Modality";
import User from "./User";
import Room from "./Room";
import TicketInterface from "@/interfaces/ticket";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPaid: boolean;

  @Column()
  userId: number;

  @Column({ nullable: true })
  roomId: number | null;

  @Column()
  modalityId: number;

  @ManyToOne(() => Modality, (modality: Modality) => modality.tickets, {
    eager: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "modalityId" })
  modality: Modality;

  @OneToOne(() => User, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Room, (room: Room) => (room.tickets), {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "roomId" })
    room: Room;

  static async getTicketInfos(userId: number) {
    return await this.find({ where: { userId } });
  }

  static async confirmPayment(userId: number) {
    return await this.update({ userId: userId }, { isPaid: true });
  }
  
  static async postTicketInfos(ticket: TicketInterface) {
    const ticketSave = this.create(ticket);
    await ticketSave.save();
    return ticketSave;
  }

  static async updateTicketRoom(userId: number, roomId: number) {
    return await this.createQueryBuilder()
      .update(this)
      .set({
        roomId,
      })
      .where("userId = :userId", { userId })
      .execute();
  }
}
