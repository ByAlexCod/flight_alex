import { FlightDTO } from "../dtos/FlightDTO";
import { IFlight } from "../../entities/IFlight";
import { ProviderEnum } from "../dtos/ProviderEnum";
import { IFlightService } from "../../services/Interfaces/IFlightService";

//function that maps a FlightDTO to a IFlight
export function mapFlightDTO(flightDTO: FlightDTO): IFlight {
    return {
        id: flightDTO.id,
        flight_number: flightDTO.flight_number,
        origin: flightDTO.from,
        destination: flightDTO.to,
        price: flightDTO.price,
        seats: flightDTO.seats,
        vip_available: flightDTO.vip_available,
    };
}

export async function mapFlight(flight: IFlight, date: Date, provider: ProviderEnum, providerService: IFlightService): Promise<FlightDTO> {
    return {
        id: flight.id,
        flight_number: flight.flight_number,
        from: flight.origin,
        to: flight.destination,
        price: flight.price,
        seats: flight.seats,
        vip_available: flight.vip_available,
        seats_available: (await providerService.getSeatsAvailable(flight, date)),
        provider
    };
}