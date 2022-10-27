import {
  getTicketDetails,
  getTickets,
  saveTicket,
  updateTicketToDB,
} from "../database/mongoDB/helper/tickets";
import { TicketAttr, TicketDTO } from "../types/ticketTypes";

export class TicketService {
  async createTicket(ticketDetails: TicketAttr) {
    return await saveTicket(ticketDetails);
  }

  async fetchTicketDetails(ticketId: string) {
    return await getTicketDetails(ticketId);
  }

  async fetchAllTickets() {
    return await getTickets();
  }

  async updateTicket(ticketId: string, ticketDetails: TicketDTO) {
    return await updateTicketToDB(ticketId, ticketDetails);
  }
}
