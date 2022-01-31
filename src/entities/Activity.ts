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
import NotValidEntity from "@/errors/NotValidEntity";

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

  @ManyToOne(() => EventDay, (eventDay: EventDay) => eventDay.activities, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "eventDayId" })
  eventDay: EventDay;

  @ManyToOne(() => Hall, (hall: Hall) => hall.activities, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "hallId" })
  hall: Hall;

  @OneToMany(() => Subscription, (subscription) => subscription.activity)
  subscriptions: Subscription[];

  static async getEventDayActivities(eventDayId: number) {
    return await this.find({ where: { eventDayId } });
  }

  static checkTimingConflict(allActivities: Subscription[], activity: Activity) {
    return;
  }

  static async postSubscribe(ticketId: number, activityId: number) {
    const activity = await this.findOne({
      where: { id: activityId },
    });

    const userTicket = await Subscription.findOne({
      where: { ticketId, activityId },
    });

    if (!activity) throw new NotValidEntity("A atividade não existe");
    if (activity.totalSeats === 0) throw new NotValidEntity("Atividade lotada");
    if (userTicket) throw new NotValidEntity("Usuário ja cadastrado");

    const allActivities = await Subscription.find({
      where: { ticketId },
      relations: ["activities"],
    });
    this.checkTimingConflict(allActivities, activity);
  }
}
