import { ProviderEnum } from "../controllers/dtos/ProviderEnum";

//export ticket interface 
export interface ITicket {
    id: string;
    price: number;
    flight: string;
    first_name: string;
    last_name: string;
    date: Date;
    vip: boolean;
    currency: string;
    provider: ProviderEnum;
    return_date: Date;
}
