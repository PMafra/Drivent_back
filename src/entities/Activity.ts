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
import SubscriptionInterface from "@/interfaces/SubscriptionInterface";
import ConflictError from "@/errors/ConflictError";

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

  @OneToMany(() => Subscription, (subscription) => subscription.activity, {
    eager: true,
  })
  subscriptions: Subscription[];

  static async getEventDayActivities(eventDayId: number) {
    return await this.find({ where: { eventDayId } });
  }

  static checkTimingConflict(
    allActivities: Subscription[],
    activity: Activity
  ) {
    for (let i = 0; i < allActivities.length; i++) {
      if (
        String(allActivities[i].activity.eventDay.day) ===
        String(activity.eventDay.day)
      ) {
        const clientsActivitiesStart = allActivities[i].activity.startTime;
        const clientsAcitiviesEnd = allActivities[i].activity.endTime;
        if (
          (clientsActivitiesStart >= activity.startTime && clientsActivitiesStart < activity.endTime) ||
          (clientsAcitiviesEnd > activity.startTime && clientsAcitiviesEnd <= activity.endTime) ||
          (clientsActivitiesStart <= activity.startTime && clientsAcitiviesEnd >= activity.endTime) ||
          (clientsActivitiesStart >= activity.startTime && clientsAcitiviesEnd <= activity.endTime)
        ) {
          throw new ConflictError("O usuario j?? tem atividadades nesse horario");
        }
      }
    }
  }

  static async postSubscribe(inscricao: SubscriptionInterface) {
    const { activityId, ticketId } = inscricao;

    const activity = await this.findOne({
      where: { id: activityId },
    });

    const userTicket = await Subscription.findOne({
      where: { ticketId, activityId },
    });

    if (!activity) throw new NotValidEntity("A atividade n??o existe");
    if (activity.totalSeats === 0) throw new NotValidEntity("Atividade lotada");
    if (userTicket) throw new NotValidEntity("Usu??rio ja cadastrado");

    const allActivities = await Subscription.find({
      where: { ticketId },
      relations: ["activity"],
    });
    this.checkTimingConflict(allActivities, activity);
    await Subscription.insert({ ticketId, activityId });
  }
}
