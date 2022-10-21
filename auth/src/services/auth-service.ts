import { randomBytes, scrypt } from "crypto";
import { sign, verify } from "jsonwebtoken";
import { promisify } from "util";
import { config } from "../config/config";
import { getUserByEmail, signUpUser } from "../database/mongoDB/helper/user";

const scryptAsync = promisify(scrypt);
export class AuthService {
  constructor(public email: string) {}

  async fetchUserByEmail() {
    return await getUserByEmail(this.email);
  }

  async registerUser(hashedPassword: string) {
    return await signUpUser(this.email, hashedPassword);
  }

  static async hashPassword(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }

  generateJWT(id: string, email: string) {
    return sign(
      {
        id,
        email,
      },
      config.jwtSecret
    );
  }

  // static validateToken(authToken: string) {
  //   return verify(authToken, config.jwtSecret);
  // }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const [hashedPwd, salt] = storedPassword.split(".");
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buffer.toString("hex") === hashedPwd;
  }
}
