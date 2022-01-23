/* eslint-disable no-undef */
import { getConnection, getRepository } from "typeorm";
import app, { init } from "../../app";
import supertest from "supertest";
import "../../setup.ts";
import Session from "@/entities/Session";
import User from "@/entities/User";
import { validNewTokenFactory } from "../../factories/session.factory";
import Ticket from "@/entities/Ticket";

beforeAll(async() => {
  await init();
});

afterAll(async() => {
  await getConnection().close();
});

beforeEach(async() => {
  await getRepository(Session).delete({});
  await getRepository(Ticket).delete({});
  await getRepository(User).delete({});
});

describe("GET /hotels", () => {
  test("returns status 200 with array of event hotels when token is valid", async() => {
    const token = await validNewTokenFactory();
    const result = await supertest(app).get("/hotels").set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });
});
