import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomIdNullable1643050202063 implements MigrationInterface {
    name = "RoomIdNullable1643050202063"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"roomId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"roomId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
