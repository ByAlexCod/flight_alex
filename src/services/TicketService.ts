
import { ITicket } from "../entities/ITicket";
import TicketRepository from "../repositories/TicketRepository";
import FlightRepository from "../repositories/FlightRepository";
import ExternalCurrencyService from "./ExternalCurrencyService";
import { ITicketService } from "./Interfaces/ITicketService";
import { ProviderEnum } from "../controllers/dtos/ProviderEnum";
import ExternalTicketService from "./ExternalTicketService";
import OtherTeamTicketService from "./OtherTeamTicketService";

export default new class TicketService implements ITicketService {

    public async bookTicket(ticket: ITicket): Promise<ITicket> {
        return this.createTicket(ticket);
    }

    public async createTicket(ticket: ITicket) {

        if(ticket.provider === ProviderEnum.EXTERNAL) {
            if(ticket.currency !== "EUR") {
                throw new Error("Cannot use another currency than euro for \"External\" Service")
            }
            return await ExternalTicketService.bookTicket(ticket);
        }  else if (ticket.provider === ProviderEnum.OTHER_TEAM) {
            return await OtherTeamTicketService.bookTicket(ticket);
        }

        //get flight from ticket
        const flight = await FlightRepository.getById(ticket.flight);
        
        if(!flight) {
            throw new Error("Flight not found");
        }
        ticket.price = flight.price;
        if(ticket.return_date) {
            ticket.price = ticket.price * 1.8
        }
        if(flight.vip_available && ticket.vip) {
            ticket.price += 150;
        } 
        if(flight.seats <= 0) {
            throw new Error("No seats available");
        }
        
        //remove one seat from flight and save
        flight.seats--;
        await FlightRepository.update(flight.id, flight);
        ticket.price = await ExternalCurrencyService.getConversion(ticket.currency, ticket.price);

        return await TicketRepository.create(ticket);
    }

    public async getAllTickets() {
        return await TicketRepository.getAll();
    }
}