import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Modality from "./Modality";
import User from "./User";
import Room from "./Room";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPaid: boolean;

  @ManyToOne(() => Modality, (modality: Modality) => (modality.tickets), {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "modalityId" })
    modality: Modality;

  @OneToOne(() => User, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "userId" })
    user: User;

  @OneToOne(() => Room, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "roomId" })
    room: Room;
}
