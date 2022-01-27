import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSubscriptionNotNull1643207891121 implements MigrationInterface {
    name = "FixSubscriptionNotNull1643207891121"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"subscriptions\" DROP CONSTRAINT \"FK_047d499184b859abb75bc74289f\"");
      await queryRunner.query("ALTER TABLE \"subscriptions\" DROP CONSTRAINT \"FK_9eddf372af5e89e1e1c45fa2db3\"");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ALTER COLUMN \"activityId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ALTER COLUMN \"ticketId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ADD CONSTRAINT \"FK_047d499184b859abb75bc74289f\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ADD CONSTRAINT \"FK_9eddf372af5e89e1e1c45fa2db3\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"subscriptions\" DROP CONSTRAINT \"FK_9eddf372af5e89e1e1c45fa2db3\"");
      await queryRunner.query("ALTER TABLE \"subscriptions\" DROP CONSTRAINT \"FK_047d499184b859abb75bc74289f\"");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ALTER COLUMN \"ticketId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ALTER COLUMN \"activityId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ADD CONSTRAINT \"FK_9eddf372af5e89e1e1c45fa2db3\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ADD CONSTRAINT \"FK_047d499184b859abb75bc74289f\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
