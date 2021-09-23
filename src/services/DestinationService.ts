import { IDestination } from "../entities/IDestination";
import DestinationRepository from "../repositories/DestinationRepository";

export default new class DestinationService {

    //create destination
    public async createDestination(destination: IDestination) {
        return await DestinationRepository.create(destination);
    }

    //get all destinations
    public async getAllDestinations() {
        return await DestinationRepository.getAll();
    }
}