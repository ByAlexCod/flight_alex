import mongoose from "mongoose";
import { FlightDTO } from "../controllers/dtos/FlightDTO";
import { IFlight } from "../entities/IFlight";
import { ITicket } from "../entities/ITicket";
import  {TicketEntity}  from "../entities/models/TicketEntity";
import FlightRepository from "./FlightRepository";

export default new class TicketRepository {
    async getSeatsAvailable(date: Date, flight: IFlight): Promise<number> {
        let totalFlight = flight.seats;
        let ticketCount = await TicketEntity.count({
            flight: flight.id,
            date: date
        });
        return totalFlight - ticketCount;
        
    }

    //get all flights
    public async getAll(): Promise<ITicket[]> {
        return (await TicketEntity.find());
    }

    //create ticket
    public async create(ticket: ITicket): Promise<ITicket> {
        return (await TicketEntity.create(ticket)).save();
    }

}()