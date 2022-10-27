import request from "supertest";
import { app } from "../app";
import { signInHelper } from "./auth-helper";

const createTicketHelper = (
  cookie: string[],
  title?: string,
  price?: number
) => {
  return request(app).post("/api/tickets").set("Cookie", cookie).send({
    title,
    price,
  });
};

export { createTicketHelper };
