import { TicketDTO } from "../dtos/TicketDTO";
import { ITicket } from "../../entities/ITicket";
import { ProviderEnum } from "../dtos/ProviderEnum";

//function that maps a TicketDTO to a ITicket
export function mapTicketDTO(ticketDTO: TicketDTO): ITicket {
    return {
        id: ticketDTO.id,
        price: ticketDTO.price,
        flight: ticketDTO.flight,
        first_name: ticketDTO.first_name,
        last_name: ticketDTO.last_name,
        vip: ticketDTO.vip,
        currency: ticketDTO.currency,
        date: ticketDTO.date,
        provider: ticketDTO.provider,
        return_date: ticketDTO.return_date
    };
}

//function that maps a ITicket to a TicketDTO
export function mapTicket(ticket: ITicket): TicketDTO {
    return {
        id: ticket.id,
        price: ticket.price,
        flight: ticket.flight,
        first_name: ticket.first_name,
        last_name: ticket.last_name,
        vip: ticket.vip,
        currency: ticket.currency,
        date: ticket.date,
        provider: ProviderEnum.INTERNAL,
        return_date: ticket.return_date
    };
}
