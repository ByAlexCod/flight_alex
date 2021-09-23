import mongoose from "mongoose";
import { ITicket } from "../ITicket";

//mongoose model
const TicketSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        required: true,
    }, 
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    vip: {
        type: Boolean,
        required: true,
    },
    currency: {
        type: String,
        oneOf: ["USD", "EUR"],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    return_date: {
        type: Date,
        required: false
    }
    
});

let ticketModel = mongoose.model<ITicket>("Ticket", TicketSchema);

export {ticketModel as TicketEntity};