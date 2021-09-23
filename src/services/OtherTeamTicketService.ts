import axios from "axios";
import { ITicket } from "../entities/ITicket";
import { ITicketService } from "./Interfaces/ITicketService";


type OtherTeamTicketType = {
    user: {
        firstName: string,
        lastName: string,
        id: number
    },
    journeyIdStart: string,
    isRoundTrip: boolean,
    lounge: boolean,
    devise: string,
    journeyReturnId: string
}

export default new class OtherTeamTicketService implements ITicketService {
    async bookTicket(ticket: ITicket): Promise<ITicket> {
        // convert ticket to OtherTeamTicketType
        const otherTeamTicket: OtherTeamTicketType = {
            user: {
                firstName: ticket.first_name,
                lastName: ticket.last_name,
                id: 0
            },
            journeyIdStart: ticket.flight,
            isRoundTrip: ticket.return_date != null,
            lounge: ticket.vip,
            devise: ticket.currency,
            journeyReturnId: ""
        }        

        await axios.post('http://api.tcousin.com/api/v1/ticket', otherTeamTicket)
        return ticket;
    }
    
}