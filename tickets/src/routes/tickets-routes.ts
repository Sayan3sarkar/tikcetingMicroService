import { authMiddleware, validateRequest } from "@sayan3sarkar-tickets/common";
import { Application, NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import {
  createTicket,
  fetchAllTickets,
  ticketDetails,
  updateTicket,
} from "../controllers/ticket-controller";

export default (app: Application) => {
  const ticketValidationParams = [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title must be a non empty value"),

    body("price")
      .isFloat({
        gt: 0,
      })
      .withMessage("Price must be a decimal greater than zero"),
  ];

  // Create new ticket
  app.post(
    "/api/tickets",
    authMiddleware,
    ticketValidationParams,
    validateRequest,
    createTicket
  );

  // Show ticket details
  app.get("/api/tickets/:id", ticketDetails);

  // Fetch all tickets
  app.get("/api/tickets", fetchAllTickets);

  app.put(
    "/api/tickets/:id",
    authMiddleware,
    ticketValidationParams,
    validateRequest,
    updateTicket
  );
};
