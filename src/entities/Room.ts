import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Hotel from "./Hotel";
import Ticket from "./Ticket";

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
  
  @OneToMany(() => Ticket, (ticket: Ticket) => (ticket.room))
    tickets: Ticket[];
  
  static async getRoomInfos() {
    return await this.find();
  }

  static async updateRoomInfo(id: number, value: number) {
    const room = await this.findOne({ id });
    room.occupiedBeds+= value;
    return await this.createQueryBuilder().update(this).set({
      occupiedBeds: room.occupiedBeds,
    })
      .where(
        "id = :id", { id }
      )
      .execute();
  }
}

