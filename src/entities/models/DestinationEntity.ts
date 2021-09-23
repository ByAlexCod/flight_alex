import mongoose from "mongoose";

//mongoose model
const destination = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        unique: true
    },
    
});

let destinationModel = mongoose.model("destination", destination);

export {destinationModel as DestinationEntity};