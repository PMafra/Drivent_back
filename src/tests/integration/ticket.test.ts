import { getConnection } from "typeorm";
import supertest from "supertest";
import "../../setup.ts";
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

describe("GET /tickets", () => {
  test("returns status 200 with array of ticket when token is valid", async() => {
    const token = await validNewTokenFactory();
    const result = await supertest(app).get("/tickets").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });
});

describe("POST /tickets/payment", () => {
  test("returns status 200 when token is valid", async() => {
    const token = await validNewTokenFactory();
    const result = await supertest(app).post("/tickets/payment").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });
});
