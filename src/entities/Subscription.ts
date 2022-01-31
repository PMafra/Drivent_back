import {
  Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BaseEntity, Column,
} from "typeorm";
import Activity from "./Activity";
import Ticket from "./Ticket";

@Entity("subscriptions")
export default class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;
  
  @Column({ nullable: false })
    activityId: number

  @Column({ nullable: false })
    ticketId: number

  @ManyToOne(() => Activity, (activity: Activity) => (activity.subscriptions), {
    nullable: false,
  })
  @JoinColumn()
    activity: Activity;

  @ManyToOne(() => Ticket, (ticket: Ticket) => (ticket.subscriptions), {
    nullable: false,
  })
  @JoinColumn()
    ticket: Ticket;
}
