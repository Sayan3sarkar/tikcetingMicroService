import request from "supertest";
import { app } from "../../app";
import {
  genericEmail,
  genericPassword,
  genericSignUpMethod,
  signInHelper,
} from "../../test/auth-helper";

// ************************* Signup Route *************************

it("Returns 201 on successful signup", async () => {
  return genericSignUpMethod().expect(201);
});

it("Returns 400 on signup route for invalid email and password", async () => {
  await request(app)
    .post("/api/users/signUp")
    .send({
      email: "test@testcom",
      password: genericPassword,
    })
    .expect(400);

  await request(app)
    .post("/api/users/signUp")
    .send({
      email: genericEmail,
      password: "123",
    })
    .expect(400);
});

it("Returns 400 on signup route for missing email and password", () => {
  return request(app).post("/api/users/signUp").send({}).expect(400);
});

it("Disallows duplicate emails on signup", async () => {
  await genericSignUpMethod().expect(201);

  await genericSignUpMethod().expect(400);
});

it("Sets cookie after successful signup", async () => {
  const res = await genericSignUpMethod().expect(201);
  expect(res.get("Set-Cookie")).toBeDefined();
});

// ************************* SignIn Route *************************

it("Returns 400 on non existent user signin attempt", async () => {
  return request(app)
    .post("/api/users/signIn")
    .send({
      email: genericEmail,
      password: genericPassword,
    })
    .expect(400);
});

it("Returns 400 on wrong password during signin attempt", async () => {
  await genericSignUpMethod().expect(201);

  await request(app)
    .post("/api/users/signIn")
    .send({
      email: genericEmail,
      password: "password1",
    })
    .expect(400);
});

it("Returns 200 on correct credentials during signin attempt", async () => {
  await genericSignUpMethod().expect(201);

  await request(app)
    .post("/api/users/signIn")
    .send({
      email: genericEmail,
      password: genericPassword,
    })
    .expect(200);
});

it("Sets cookie after successful signin", async () => {
  await genericSignUpMethod().expect(201);

  const res = await request(app)
    .post("/api/users/signIn")
    .send({
      email: genericEmail,
      password: genericPassword,
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});

// ************************* SignOut Route *************************

it("Clears cookie after successful signOut", async () => {
  await genericSignUpMethod().expect(201);

  const res = await request(app)
    .post("/api/users/signOut")
    .send({})
    .expect(200);

  //   console.log(res.get("Set-Cookie"));
  expect(res.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});

// ************************* Current user Route *************************
it("Responds with details about current user", async () => {
  const cookie = await signInHelper();

  console.log(cookie);
  const res = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual(genericEmail);
});

it("Responds with null as current user if not authenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});
