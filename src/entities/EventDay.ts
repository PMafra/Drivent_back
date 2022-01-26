import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Timestamp } from "typeorm";
import Activity from "./Activity";

@Entity("eventDays")
export default class EventDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: Timestamp;
  
  @OneToMany(() => Activity, (activity: Activity) => (activity.eventDay))
    activities: Activity[];
}
