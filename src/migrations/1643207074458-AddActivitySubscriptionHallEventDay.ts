import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActivitySubscriptionHallEventDay1643207074458 implements MigrationInterface {
    name = "AddActivitySubscriptionHallEventDay1643207074458"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"eventDays\" (\"id\" SERIAL NOT NULL, \"day\" TIMESTAMP NOT NULL, CONSTRAINT \"PK_410702c0d792566db2e3e451fd4\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"halls\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_4665c2f3b1e718e12b06278bae8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"subscriptions\" (\"id\" SERIAL NOT NULL, \"activityId\" integer, \"ticketId\" integer, CONSTRAINT \"PK_a87248d73155605cf782be9ee5e\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"startTime\" TIME NOT NULL, \"endTime\" TIME NOT NULL, \"totalSeats\" integer NOT NULL, \"eventDayId\" integer NOT NULL, \"hallId\" integer NOT NULL, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ADD CONSTRAINT \"FK_047d499184b859abb75bc74289f\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"subscriptions\" ADD CONSTRAINT \"FK_9eddf372af5e89e1e1c45fa2db3\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_4cfa6561a3127b224e5c3ff2c1e\" FOREIGN KEY (\"eventDayId\") REFERENCES \"eventDays\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_f8b6757fd7ca9274e689f97b7b9\" FOREIGN KEY (\"hallId\") REFERENCES \"halls\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_f8b6757fd7ca9274e689f97b7b9\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_4cfa6561a3127b224e5c3ff2c1e\"");
      await queryRunner.query("ALTER TABLE \"subscriptions\" DROP CONSTRAINT \"FK_9eddf372af5e89e1e1c45fa2db3\"");
      await queryRunner.query("ALTER TABLE \"subscriptions\" DROP CONSTRAINT \"FK_047d499184b859abb75bc74289f\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"subscriptions\"");
      await queryRunner.query("DROP TABLE \"halls\"");
      await queryRunner.query("DROP TABLE \"eventDays\"");
    }
}
