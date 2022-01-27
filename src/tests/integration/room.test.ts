import { getConnection } from "typeorm";
import app, { init } from "../../app";
import supertest from "supertest";
import "../../setup";
import { validNewTokenFactory } from "../factories/session.factory";
import * as databaseHelper from "../helpers/databaseHelper";

beforeAll(async() => {
  await init();
});

afterAll(async() => {
  await getConnection().close();
});

beforeEach(async() => {
  await databaseHelper.clear();
});

describe("GET /rooms", () => {
  test("returns status 200 with array of all hotel rooms", async() => {
    const token = await validNewTokenFactory();
    const result = await supertest(app).get("/rooms").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
    result.body.forEach(() =>
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        totalBeds: expect.any(Number),
        occupiedBeds: expect.any(Number),
        hotelId: expect.any(Number)
      }),
    );
  });
});
