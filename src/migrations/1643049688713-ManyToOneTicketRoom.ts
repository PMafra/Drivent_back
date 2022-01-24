import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToOneTicketRoom1643049688713 implements MigrationInterface {
    name = "ManyToOneTicketRoom1643049688713"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_0a6a462ac04bd5f99ecb810c3bd\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"roomId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"UQ_4ee357cce7fc67e1ffe07bb65f9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_0a6a462ac04bd5f99ecb810c3bd\" FOREIGN KEY (\"modalityId\") REFERENCES \"modalities\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_0a6a462ac04bd5f99ecb810c3bd\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"UQ_4ee357cce7fc67e1ffe07bb65f9\" UNIQUE (\"roomId\")");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"roomId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_0a6a462ac04bd5f99ecb810c3bd\" FOREIGN KEY (\"modalityId\") REFERENCES \"modalities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
