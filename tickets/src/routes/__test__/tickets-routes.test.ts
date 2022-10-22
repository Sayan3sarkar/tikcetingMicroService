import request from "supertest";
import { app } from "../../app";
import { signInHelper } from "../../test/auth-helper";

it("Has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("Can only be accessed if user is signed in", async () => {
  const cookie = signInHelper();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});

  console.log(response.statusCode, response.status);

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signInHelper())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signInHelper())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signInHelper())
    .send({
      title: "Test",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signInHelper())
    .send({
      title: "Test",
    })
    .expect(400);
});

// it("creates a ticket with valid inputs", async () => {
//   return request(app)
//     .post("/api/tickets")
//     .set("Cookie", signInHelper())
//     .send({
//       title: "Test",
//       price: 10,
//     })
//     .expect(200);
// });
