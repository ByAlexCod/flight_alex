//express ts flight controller
import express from "express";
import { mapTicket, mapTicketDTO } from "./mappers/TicketMapper";
import TicketService from "../services/TicketService";
const router = express.Router();
const ENDPOINT = "/ticket";

router.get(ENDPOINT + "/health", (req, res) => {
  res.send("ticket");
});

//create destination router
router.post(ENDPOINT, async (req, res) => {
  try {
    const destinationDTO = req.body;
    const destination = mapTicketDTO(destinationDTO);
    const result = await TicketService.createTicket(destination);
    if(result !== null) {
      res.send(mapTicket(result));
    } else {
      res.status(201).send("Ticket created");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//create bulk destinations
router.post(ENDPOINT + "/bulk", async (req, res) => {
  try {
    const destinations = req.body;
    //loop to create destinations
    for (let i = 0; i < destinations.length; i++) {
      const destination = mapTicketDTO(destinations[i]);
      await TicketService.createTicket(destination);
    }
    res.send("destinations created");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//get all destinations
router.get(ENDPOINT, async (req, res) => {
  try {
    res.send(await TicketService.getAllTickets());
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


export {router as TicketRouter};