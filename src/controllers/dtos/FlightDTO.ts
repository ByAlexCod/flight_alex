import { ProviderEnum } from "./ProviderEnum";

export interface FlightDTO {
    id: string;
    flight_number: string;
    from: string;
    to: string;
    price: number;
    seats: number;
    seats_available: number;
    vip_available: boolean;
    provider: ProviderEnum;
}    