import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const genericEmail = "test@test.com";
const genericPassword = "password";
const genericId = "123test123";

const signInHelper = () => {
  //Create JWT Payload: {id, email} & token- jwt.sign
  const token = sign(
    {
      id: genericId,
      email: genericEmail,
    },
    process.env.JWT_KEY!
  );

  // Build session object({jwt: token}) & Convert session object to JSON
  const sessionObj = JSON.stringify({ jwt: token });

  // Take JSON and encode it as base64
  const base64Session = Buffer.from(sessionObj).toString("base64");

  // return string which is the cookie with encoded data
  return [`session=${base64Session}`];
};

export { signInHelper, genericEmail, genericPassword };
