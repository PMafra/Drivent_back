import {
  Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BaseEntity,
} from "typeorm";
import Activity from "./Activity";
import Ticket from "./Ticket";

@Entity("subscriptions")
export default class Subscription extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number;
  
    @ManyToOne(() => Activity, (activity: Activity) => (activity.subscriptions), {
      eager: true,
      nullable: false,
    })
    @JoinColumn()
      activity: Activity;
  
    @ManyToOne(() => Ticket, (ticket: Ticket) => (ticket.subscriptions), {
      eager: true,
      nullable: false,
    })
    @JoinColumn()
      ticket: Ticket;
}
