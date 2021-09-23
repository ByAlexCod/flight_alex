//express ts flight controller
import express from "express";
import FlightService from "../services/FlightService";
import { mapFlight, mapFlightDTO } from "./mappers/FlightMapper";
import ExternalCurrencyService from "../services/ExternalCurrencyService";
import { ProviderEnum } from "./dtos/ProviderEnum";
import { IFlightService } from "../services/Interfaces/IFlightService";
import ExternalFlightService from "../services/ExternalFlightService";
import { FlightDTO } from "./dtos/FlightDTO";
import OtherTeamFlightService from "../services/OtherTeamFlightService";
const router = express.Router();
const ENDPOINT = "/flight";

const providers: IFlightService[] = [FlightService, ExternalFlightService, OtherTeamFlightService]


router.get(ENDPOINT + "/health", (req, res) => {
  res.send("flight");
});

//create flight router
router.post(ENDPOINT, async (req, res) => {
  const flightDTO = req.body;
  const flight = await FlightService.createFlight(mapFlightDTO(flightDTO));
  
  res.send(await mapFlight(flight, new Date(), ProviderEnum.INTERNAL, FlightService));
});

//get all flights as FlightDTO
router.get(ENDPOINT, async (req, res) => {
  
  let currency = req.query.currency;
  if(!currency){
    currency = "EUR"
  }
  let totalFlights: FlightDTO[] = []

  //get all flights from external providers
  for (const provider of req.query.provider == "all" ? providers : providers.filter(p => p.getProvider() == ProviderEnum.INTERNAL)) {
    console.log(provider.getProvider());
    
    const externalFlights = await provider.getFlights(new Date(req.query.date as string));

    for(let flight of externalFlights){
      let flightDTO = await mapFlight(flight, new Date(), provider.getProvider(), provider);
      totalFlights.push(flightDTO);
    }
    // let tempFlight = externalFlights.map(async (f) => {return await mapFlight(f, new Date(req.query.date as string), provider.getProvider(), provider)});
    
    
    // totalFlights = totalFlights.concat(externalFlights.map(async (f) => {return await mapFlight(f, new Date(req.query.date), provider.getProvider(), provider)}));
  }
  for(let flight of totalFlights){
    flight.price = await ExternalCurrencyService.getConversion((currency as string), flight.price);
  }

  res.send(totalFlights);
});

export {router as FlightRouter};