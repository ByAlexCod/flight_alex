export interface IFlight {
    id: string;
    flight_number: string;
    origin: string;
    destination: string;
    price: number;
    seats: number;
    vip_available: boolean;
}