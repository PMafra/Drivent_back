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

describe("GET /event-days", () => {
  test("returns status 200 with array of all event days when token is valid", async() => {
    const token = await validNewTokenFactory();
    const result = await supertest(app).get("/event-days").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
    result.body.forEach(() =>
      expect.objectContaining({
        id: expect.any(Number),
        day: expect.any(Date),
      }),
    );
  });
});

describe("GET /event-days", () => {
  test("returns unauthorized error when token is invalid", async() => {
    const token = "invalid token";
    const result = await supertest(app).get("/event-days").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(401);
  });
});

