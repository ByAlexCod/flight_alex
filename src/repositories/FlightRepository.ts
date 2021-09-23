import mongoose from "mongoose";
import { FlightDTO } from "../controllers/dtos/FlightDTO";
import { IFlight } from "../entities/IFlight";
import  {FlightEntity}  from "../entities/models/FlightEntity";

export default new class FlightRepository {
    getById(flight: string) {
        return FlightEntity.findById(flight);
    }

    public async create(model: IFlight) {

        //generate uuid
        const id = new mongoose.Types.ObjectId();

        //log id
        model.id = id.toString();

        
        let flight = await FlightEntity.create({
            id: model.id,
            flight_number: model.flight_number,
            origin: model.origin,
            destination: model.destination,
            vip_available: model.vip_available,
            price: model.price,
            seats: model.seats
        });


        (await flight.save())
        
        return model;
    }

    //get all flights
    public async getAll(): Promise<IFlight[]> {
        return (await FlightEntity.find());
    }

    public async update(id: string, model: IFlight) {
        return FlightEntity.findByIdAndUpdate(id, {
            $set: {
                flight_number: model.flight_number,
                origin: model.origin,
                destination: model.destination,
                price: model.price,
                seats: model.seats
            }
        });
    }


}()