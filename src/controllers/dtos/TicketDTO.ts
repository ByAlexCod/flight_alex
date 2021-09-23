import { ProviderEnum } from "./ProviderEnum";

//plane ticket dto interface
export interface TicketDTO {
    id: string;
    price: number;
    flight: string;
    first_name: string;
    last_name: string;
    currency: string;
    vip: boolean;
    date: Date;
    return_date: Date;
    provider: ProviderEnum;
}
