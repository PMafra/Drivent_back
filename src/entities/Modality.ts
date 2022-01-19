import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Ticket from "./Ticket";

@Entity("modalities")
export default class Modality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Ticket, (ticket: Ticket) => (ticket.modality))
  tickets: Ticket[];
}

