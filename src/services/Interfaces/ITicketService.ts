import { ITicket } from "../../entities/ITicket";

export interface ITicketService {
    bookTicket(ticket: ITicket): Promise<ITicket>;
}