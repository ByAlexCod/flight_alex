import { ProviderEnum } from "../../controllers/dtos/ProviderEnum";
import { IFlight } from "../../entities/IFlight";

export interface IFlightService {
    getFlights(date?: Date): Promise<IFlight[]>;

    getProvider(): ProviderEnum;

    getSeatsAvailable(flight: IFlight, date: Date): Promise<number>;
}