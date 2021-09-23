import mongoose from "mongoose";
import { IFlight } from "../IFlight";

//mongoose model
const FlightSchema = new mongoose.Schema({
    flight_number: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    vip_available: {
        type: Boolean,
        required: true
    },
    
});

let flightModel = mongoose.model<IFlight>("Flight", FlightSchema);

export {flightModel as FlightEntity};