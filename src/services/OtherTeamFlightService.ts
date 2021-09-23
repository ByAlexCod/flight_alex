import { ProviderEnum } from "../controllers/dtos/ProviderEnum";
import { IFlight } from "../entities/IFlight";
import { IFlightService } from "./Interfaces/IFlightService";
import axios from "axios";
import moment from "moment";

interface Departure {
  name: string;
  tag: string;
  hasLounge: boolean;
}

interface Arrival {
  name: string;
  tag: string;
  hasLounge: boolean;
}

interface Flight {
  id: number;
  departure: Departure;
  arrival: Arrival;
  price: number;
  seats: number;
}

interface ExternalFlightModel {
  id: string;
  flight: Flight;
  date: Date;
  remainingSeats: number;
}
export default new (class OtherTeamFlightService implements IFlightService {
  async getFlights(date: Date): Promise<IFlight[]> {
    let externalFlights = (await axios.get<ExternalFlightModel[]>("http://api.tcousin.com/api/v1/journey/" + moment(date).format("DD-MM-YYYY"))).data;
    
    let flights: IFlight[] = [];
    

    for(let externalFlight of externalFlights) {
        flights.push({
            id: externalFlight.id,
            flight_number: externalFlight.flight.id.toString(),
            origin: externalFlight.flight.departure.name,
            destination: externalFlight.flight.arrival.name,
            price: externalFlight.flight.price,
            seats: externalFlight.flight.seats,
            vip_available: externalFlight.flight.departure.hasLounge,
        });
    }

    return flights;

  }
  getProvider(): ProviderEnum {
    return ProviderEnum.OTHER_TEAM;
  }
  async getSeatsAvailable(flight: IFlight, date: Date): Promise<number> {
    let externalFlights = (await axios.get<ExternalFlightModel[]>("http://api.tcousin.com/api/v1/journey/" + moment(date).format("DD-MM-YYYY"))).data;
    return externalFlights.find(externalFlight => externalFlight.id === flight.id)!.remainingSeats;

  }
})();
