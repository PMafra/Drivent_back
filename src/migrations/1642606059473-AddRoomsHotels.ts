import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomsHotels1642606059473 implements MigrationInterface {
    name = "AddRoomsHotels1642606059473"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"totalBeds\" integer NOT NULL, \"occupiedBeds\" integer NOT NULL, \"hotelId\" integer, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"imgUrl\" character varying NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"userId\" integer");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"UQ_4bb45e096f521845765f657f5c8\" UNIQUE (\"userId\")");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"roomId\" integer");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"UQ_4ee357cce7fc67e1ffe07bb65f9\" UNIQUE (\"roomId\")");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"UQ_4ee357cce7fc67e1ffe07bb65f9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"roomId\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"UQ_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"userId\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
    }
}
