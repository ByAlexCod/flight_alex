//express ts flight controller
import express from "express";
import { mapDestination, mapDestinationDTO } from "./mappers/DestinationMapper";
import DestinationService from "../services/DestinationService";
const router = express.Router();
const ENDPOINT = "/destination";

router.get(ENDPOINT + "/health", (req, res) => {
  res.send("destination");
});

//create destination router
router.post(ENDPOINT, async (req, res) => {
  try {
    const destinationDTO = req.body;
    const destination = mapDestinationDTO(destinationDTO);
    res.send(mapDestination(await DestinationService.createDestination(destination)));
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
      const destination = mapDestinationDTO(destinations[i]);
      await DestinationService.createDestination(destination);
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
    res.send(await DestinationService.getAllDestinations());
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


export {router as DestinationRouter};