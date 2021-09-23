import { ProviderEnum } from "../controllers/dtos/ProviderEnum";
import { IFlight } from "../entities/IFlight";
import FlightRepository from "../repositories/FlightRepository";
import TicketRepository from "../repositories/TicketRepository";
import { IFlightService } from "./Interfaces/IFlightService";

export default new class FlightService implements IFlightService {
    async getSeatsAvailable(flight: IFlight, date: Date): Promise<number> {
        return await TicketRepository.getSeatsAvailable(date, flight);
    }

    //create destination
    public async createFlight(flight: IFlight) {
        
        return await FlightRepository.create(flight);
    }

    //get all flights
    public async getFlights() {
        return await FlightRepository.getAll();
    }

    getProvider(): ProviderEnum {
        return ProviderEnum.INTERNAL;
    }
}
