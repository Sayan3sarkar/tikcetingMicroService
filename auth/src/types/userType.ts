import { Document, Model } from "mongoose";

// properties required to create a document
interface UserAttr {
  email: string;
  password: string;
}

// indicates what properties a signle document has
interface UserDoc extends Document, UserAttr {
  email: string;
  password: string;
}

// All different properties we would want to assign to our model itsef. Represents entire collection
interface UserModel extends Model<UserDoc> {
  build(attributes: UserAttr): UserDoc;
}

export { UserAttr, UserDoc, UserModel };
