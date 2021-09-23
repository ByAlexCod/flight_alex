import axios from "axios";
import moment from "moment";
import { ProviderEnum } from "../controllers/dtos/ProviderEnum";
import { IFlight } from "../entities/IFlight";
import { ITicket } from "../entities/ITicket";
import { IFlightService } from "./Interfaces/IFlightService";
export type externalFlightType = 
{
    code:string,
    departure: string,
    arrival: string,
    base_price:number,
    plane:{name:string,total_seats:number}
}

export type externalFlightTypeWithDate = 
    {flight:
    {code:string,
    departure:string,
    arrival:string,
    base_price:number,
    plane:{name:string,total_seats:number}},availability:number
}


export default new class ExternalFlightService implements IFlightService {
    
    
    private static GET_FLIGHTS_URL = 'https://api-6yfe7nq4sq-uc.a.run.app/flights';
    private static GET_FLIGHTS_WITH_DATE = 'https://api-6yfe7nq4sq-uc.a.run.app/flights/';

    
    private async getFlightsExternalType(date: Date): Promise<externalFlightTypeWithDate[]> {
       
        const response = await axios.get(ExternalFlightService.GET_FLIGHTS_WITH_DATE + moment(date).format('DD-MM-YYYY'));
        const flightsFromExternal = (await response.data) as externalFlightTypeWithDate[];
        return flightsFromExternal;
    }

    public async getFlights(): Promise<IFlight[]> {
        const response = await axios.get(ExternalFlightService.GET_FLIGHTS_URL);
        const flightsFromExternal = (await response.data) as externalFlightType[];
        return this.mapToIFlights(flightsFromExternal);
    }

    public mapFromIFlights(flight: IFlight): externalFlightType {
        return {
            code: flight.id,
            departure: flight.origin,
            arrival: flight.destination,
            base_price: flight.price,
            plane: {
                name: '',
                total_seats: flight.seats
            }

        }
    }

    public async getFlightByIdAndITicket(flightId: string, originalTicket: ITicket): Promise<externalFlightTypeWithDate> {

        let allFlights = await this.getFlightsExternalType(originalTicket.date);
        let flight = allFlights.find((f) => f.flight.code === flightId);


        if(!flight) {
            throw new Error('Flight not found from ' + this.getProvider().toString());
        }
        return flight;
    }



    public mapToIFlights(flights: externalFlightType[]): IFlight[] {
        return flights.map(flight => {
            return {
                id: flight.code,
                flight_number: flight.code,
                origin: flight.departure,
                destination: flight.arrival,
                price: flight.base_price,
                seats: flight.plane.total_seats,
                vip_available: false
            };
        });
    }

    public async getSeatsAvailable(iflight: IFlight, date: Date): Promise<number> {
        let allFlights = await this.getFlightsExternalType(date);
        let flight = allFlights.find((f) => f.flight.code === iflight.id);


        if(!flight) {
            throw new Error('Flight not found from ' + this.getProvider().toString());
        }
        return flight.availability;
    }

    getProvider(): ProviderEnum {
        return ProviderEnum.EXTERNAL;
    }
}