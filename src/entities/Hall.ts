import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Activity from "./Activity";

@Entity("halls")
export default class Hall extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @OneToMany(() => Activity, (activity: Activity) => (activity.hall))
    activities: Activity[];
}
