import mongoose from "mongoose";
import { FlightDTO } from "../controllers/dtos/FlightDTO";
import { IDestination } from "../entities/IDestination";
import { IFlight } from "../entities/IFlight";
import { DestinationEntity } from "../entities/models/DestinationEntity";
import  {FlightEntity}  from "../entities/models/FlightEntity";

export default new class DestinationRepository {

    public async create(model: IDestination) {

        //generate uuid
        const id = new mongoose.Types.ObjectId();

        //log id
        model.id = id.toString();

        
        let destination = await DestinationEntity.create({
            id: model.id,
            name: model.name,
            tag: model.tag
        });

        (await destination.save())
        
        return model;
    }

    //get all destinations
    public async getAll() {
        return await DestinationEntity.find();
    }


}()