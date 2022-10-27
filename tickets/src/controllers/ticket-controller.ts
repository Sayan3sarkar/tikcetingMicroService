import {
  NotAuthorizedError,
  NotFoundError,
} from "@sayan3sarkar-tickets/common";
import { NextFunction, Request, Response } from "express";
import { TicketService } from "../services/ticket-service";

const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, price } = req.body;
    const userId = req.user?.id as string;

    const ticketService = new TicketService();

    const ticket = await ticketService.createTicket({
      price,
      title,
      userId,
    });

    res.status(201).send(ticket);
  } catch (err) {
    next(err);
  }
};

const ticketDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: ticketId } = req.params;

    if (!ticketId) {
      console.log("No ticket ID passed");
      throw new NotFoundError();
    }

    const ticketService = new TicketService();
    const ticket = await ticketService.fetchTicketDetails(ticketId);

    if (!ticket) {
      console.log("Ticket with given ID not found");
      throw new NotFoundError();
    }

    res.send(ticket);
  } catch (err) {
    next(err);
  }
};

const fetchAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticketService = new TicketService();
    const tickets = await ticketService.fetchAllTickets();

    res.send(tickets);
  } catch (err) {
    next(err);
  }
};

const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: ticketId } = req.params;
    const { title, price } = req.body;

    if (!ticketId) {
      console.log("No ticket ID passed");
      throw new NotFoundError();
    }

    const ticketService = new TicketService();
    const ticket = await ticketService.fetchTicketDetails(ticketId);

    if (!ticket) {
      console.log(`Ticket with id ${ticketId} not found in DB`);
      throw new NotFoundError();
    }

    if (ticket.userId !== req.user?.id) {
      console.log("Trying to update ticket which is not owned by requestor");
      throw new NotAuthorizedError();
    }

    await ticketService.updateTicket(ticket.id, { title, price });

    res.send("Ticket Updated Successfully");
  } catch (err) {
    next(err);
  }
};

export { createTicket, ticketDetails, fetchAllTickets, updateTicket };
