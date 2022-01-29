import { getConnection } from "typeorm";
import supertest from "supertest";
import "../../setup";
import app, { init } from "../../app";
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

describe("GET /activities/1", () => {
  test("returns status 200 with array of activities when token is valid", async() => {
    const token = await validNewTokenFactory();
    const result = await supertest(app).get("/activities/1").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });
});
