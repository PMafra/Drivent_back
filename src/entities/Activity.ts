import { 
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import EventDay from "./EventDay";
import Hall from "./Hall";
import Subscription from "./Subscription";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("time")
  startTime: Date;

  @Column("time")
  endTime: Date;

  @Column()
  totalSeats: number;

  @Column()
  eventDayId: number;

  @Column()
  hallId: number;

  @ManyToOne(() => EventDay, (eventDay: EventDay) => (eventDay.activities), {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "eventDayId" })
    eventDay: EventDay;

  @ManyToOne(() => Hall, (hall: Hall) => (hall.activities), {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "hallId" })
    hall: Hall;

  @OneToMany(() => Subscription, (subscription) => subscription.activity, { eager: true })
    subscriptions: Subscription[];

  static async getEventDayActivities(eventDayId: number) {
    return await this.find({ where: { eventDayId } });
  }
}
