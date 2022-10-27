import { NotFoundError } from "@sayan3sarkar-tickets/common";
import { TicketAttr, TicketDoc, TicketDTO } from "../../../types/ticketTypes";
import { Ticket } from "../models/ticket";

const saveTicket = async (ticketDetails: TicketAttr) => {
  const ticket = Ticket.build(ticketDetails);
  await ticket.save();

  return ticket;
};

const getTicketDetails = async (ticketId: string) => {
  return await Ticket.findById(ticketId);
};

const getTickets = async () => {
  return await Ticket.find({});
};

const updateTicketToDB = async (
  ticketId: string,
  { title, price }: TicketDTO
) => {
  const ticket = (await getTicketDetails(ticketId)) as TicketDoc;

  if (!ticket) {
    console.log(`Ticket having id: ${ticketId} not found`);
    throw new NotFoundError();
  }

  const ticketDetails: TicketDTO = {};

  if (title) {
    ticketDetails.title = title;
  }

  if (price) {
    ticketDetails.price = price;
  }

  if (ticketDetails) {
    ticket.set(ticketDetails);
    await ticket.save();
  }
};

export { saveTicket, getTicketDetails, getTickets, updateTicketToDB };
