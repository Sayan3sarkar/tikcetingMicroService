import { Document, Model } from "mongoose";

interface UserAttr {
  email: string;
  password: string;
}

interface UserDoc extends Document, UserAttr {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attributes: UserAttr): UserDoc;
}

export { UserAttr, UserDoc, UserModel };
