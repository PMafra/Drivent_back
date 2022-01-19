import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import Hotel from "./Hotel";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  totalBeds: number;

  @Column()
  occupiedBeds: number;

  @ManyToOne(() => Hotel, (hotel: Hotel) => (hotel.rooms), {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "hotelId" })
    hotel: Hotel;
}

