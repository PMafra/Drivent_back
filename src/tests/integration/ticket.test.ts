/* eslint-disable no-undef */
import { getConnection } from "typeorm";
import supertest from "supertest";
import { getRepository } from "typeorm";

import "../../setup.ts";
import app, { init } from "../../app";
import Session from "@/entities/Session";
import User from "@/entities/User";

import { validNewTokenFactory } from "../../factories/session.factory";

beforeAll(async() => {
  await init();
});

afterAll(async() => {
  // await getRepository(Session).delete({});
  //await getRepository(User).delete({});
  await getConnection().close();
});

describe("GET /tickets", () => {
  test("returns status 200 with array of ticket when token is valid", async() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY0Mjc0NTY2Nn0.itGPsvi7_UfObQBB3LZ1ks2lm6RM9izq5yAOXSS0Zh8";
    const result = await supertest(app).get("/tickets").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });
});
