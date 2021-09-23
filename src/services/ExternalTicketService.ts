import { ITicket } from "../entities/ITicket";
import {
  externalFlightType,
  externalFlightTypeWithDate,
} from "./ExternalFlightService";
import { ITicketService } from "./Interfaces/ITicketService";
import ExternalFlightService from "./ExternalFlightService";
import axios from "axios";
import { ProviderEnum } from "../controllers/dtos/ProviderEnum";
import moment from "moment";

enum OptionType {
  BonusLuggage,
  FirstClass,
  ChampagneOnBoard,
  LoungeAccess,
}

type externalTicket = {
  code: string;
  flight: any;
  date: string;
  payed_price: number;
  customer_name: string;
  customer_nationality: string;
  options: {
    option_type: OptionType;
    price: number;
  }[];
  booking_source: string;
};

export default new (class ExternalTicketService implements ITicketService {
  private static BOOK_URL = "https://api-6yfe7nq4sq-uc.a.run.app/book";
  async bookTicket(ticket: ITicket): Promise<ITicket> {
    //book tiket with axios, book_url is the url to book a ticket and ticket is the ticket to book with mapToExternalTicket
    let savedTicket = await axios.post<externalTicket>(
      ExternalTicketService.BOOK_URL,
      await this.mapToExternalTicket(ticket)
    );
    return ticket;
  }
 

  async mapToExternalTicket(ticket: ITicket): Promise<externalTicket> {
    let r = await ExternalFlightService.getFlightByIdAndITicket(
      ticket.flight,
      ticket
    );
    return {
      code: ticket.id,
      flight: r.flight,
      date: moment(ticket.date).format("DD-MM-YYYY"),
      payed_price: r.flight.base_price,
      customer_name: `${ticket.first_name} ${ticket.last_name}`,
      customer_nationality: "French",
      options: [],
      booking_source: "ALEX",
    };
  }
})();
