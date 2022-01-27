import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Activity from "./Activity";

@Entity("eventDays")
export default class EventDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: Date;
  
  @OneToMany(() => Activity, (activity: Activity) => (activity.eventDay))
    activities: Activity[];

  static async getEventDayInfos() {
    return await this.find();
  }
}
