import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../database/mongoDB/models/ticket";
import { signInHelper } from "../../test/auth-helper";
import { createTicketHelper } from "../../test/ticket-helper";
import { generateRandomMongooseHexId } from "../../utils/utils";

// ************************* Create new ticket Route *************************

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
  const cookie = signInHelper();
  await createTicketHelper(cookie, "", 10).expect(400);

  await createTicketHelper(cookie, undefined, 10).expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  const cookie = signInHelper();
  await createTicketHelper(cookie, "Test", -10).expect(400);

  await createTicketHelper(cookie, "Test").expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = "Test";
  const price = 10;

  const cookie = signInHelper();
  await createTicketHelper(cookie, title, price).expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(price);
  expect(tickets[0].title).toEqual(title);
});

// ************************* Show ticket details Route *************************

it("Returns 404 if ticket not found", async () => {
  const randomId = generateRandomMongooseHexId();
  await request(app).get(`/api/tickets/${randomId}`).send().expect(404);
});

it("Returns ticket if ticket is found", async () => {
  const title = "Test";
  const price = 10;

  const cookie = signInHelper();
  const response = await createTicketHelper(cookie, title, price).expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

// ************************* Get All Tickets Route *************************

it("Can fetch a list of tickets", async () => {
  const cookie = signInHelper();
  await Promise.all([
    createTicketHelper(cookie, "Test 1", 20).expect(201),
    createTicketHelper(cookie, "Test 2", 10).expect(201),
    createTicketHelper(cookie, "Test 3", 30).expect(201),
  ]);

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});

// ************************* Update Ticket Route *************************

it("Returns 401 if user is not authenticated", async () => {
  const title = "Test";
  const price = 10;

  const id = generateRandomMongooseHexId();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title,
      price,
    })
    .expect(401);
});

it("Returns 404 if provided ID does not exist", async () => {
  const title = "Test";
  const price = 10;

  const id = generateRandomMongooseHexId();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signInHelper())
    .send({
      title,
      price,
    })
    .expect(404);
});

it("Returns 401 if user does not own the ticket", async () => {
  const title = "Test";
  const price = 10;

  const cookie = signInHelper();
  const ticketResponse = await createTicketHelper(cookie, title, price);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);

  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", signInHelper())
    .send({ title, price })
    .expect(401);
});

it("Returns 400 for invalid title or price", async () => {
  const title = "Test";
  const price = 10;

  const cookie = signInHelper();
  const ticketResponse = await createTicketHelper(cookie, title, price).expect(
    201
  );

  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({ title, price: -10 })
    .expect(400);
});

it("Updates Ticket successfully for valid inputs", async () => {
  const title = "Test";
  const price = 10;

  const cookie = signInHelper();
  const response = await createTicketHelper(cookie, title, price).expect(201);

  // Update ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "Test1", price: 20 })
    .expect(200);

  // Fetch updated ticket details
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual("Test1");
  expect(ticketResponse.body.price).toEqual(20);
});
