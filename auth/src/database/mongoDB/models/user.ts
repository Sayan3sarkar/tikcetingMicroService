import { Schema, Model, model } from "mongoose";
// import { AuthService } from "../../../services/auth-service";
import { UserAttr, UserDoc, UserModel } from "../../../types/userType";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Mongoose pre-save hook
// userSchema.pre("save", async function (done) {
//   try {
//     if (this.isModified("password")) {
//       const hashedPwd = await AuthService.hashPassword(this.get("password"));
//       this.set("password", hashedPwd);
//       done();
//     }
//   } catch (err: any) {
//     done(err);
//   }
// });

userSchema.statics.build = (attributes: UserAttr) => new User(attributes); // We can later use code like User.build({email: "", password: ""})

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
