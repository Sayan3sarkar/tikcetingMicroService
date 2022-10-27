import { Document, Model } from "mongoose";

interface TicketAttr {
  title: string;
  price: number;
  userId: string;
}

interface TicketDoc extends Document, TicketAttr {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends Model<TicketDoc> {
  build(attributes: TicketAttr): TicketDoc;
}

type TicketDTO = Partial<Omit<TicketAttr, "userId">>;

export { TicketAttr, TicketDoc, TicketModel, TicketDTO };
