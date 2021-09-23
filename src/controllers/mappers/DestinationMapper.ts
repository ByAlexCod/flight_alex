import { DestinationDTO } from "../dtos/DestinationDTO";
import { IDestination } from "../../entities/IDestination";

//function that maps a DestinationDTO to a IDestination
export function mapDestinationDTO(destinationDTO: DestinationDTO): IDestination {
    return {
        id: destinationDTO.id,
        name: destinationDTO.name,
        tag: destinationDTO.tag
    };
}

//function that maps a IDestination to a DestinationDTO
export function mapDestination(destination: IDestination): DestinationDTO {
    return {
        id: destination.id,
        name: destination.name,
        tag: destination.tag,
    };
}