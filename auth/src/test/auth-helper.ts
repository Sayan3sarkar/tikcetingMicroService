import request from "supertest";
import { app } from "../app";

const genericEmail = "test@test.com";
const genericPassword = "password";

const signInHelper = async () => {
  const res = await genericSignUpMethod().expect(201);
  const cookie = res.get("Set-Cookie");

  return cookie;
};

const genericSignUpMethod = () => {
  return request(app).post("/api/users/signUp").send({
    email: genericEmail,
    password: genericPassword,
  });
};

export { signInHelper, genericSignUpMethod, genericEmail, genericPassword };
