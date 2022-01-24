import { getConnection } from "typeorm";
import app, { init } from "../../app";
import supertest from "supertest";
import "../../setup.ts";
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

describe("GET /enrollments", () => {
  test("returns status 204 if there are no enrollments", async() => {
    const token = await validNewTokenFactory();
    const result = await supertest(app).get("/enrollments").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(204);
    expect(Array.isArray(result.body)).toBe(false);
  });
});
