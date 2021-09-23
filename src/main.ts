require('dotenv').config();
import express from "express";
import { json } from "body-parser";
import { FlightRouter } from "./controllers/FlightRouter";
import mongoose from "mongoose";
import { DestinationRouter } from "./controllers/DestinationRouter";
import { TicketRouter } from "./controllers/TicketRouter";
import { CurrencyRouter } from "./controllers/CurrencyRouter";
import cors from 'cors';


// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
// const allowedOrigins = ['http://localhost:3000'];

const app = express();

//allow cors all
app.use(cors());

app.use(json());
app.use(FlightRouter);
app.use(DestinationRouter);
app.use(TicketRouter);
app.use(CurrencyRouter);

mongoose.connect("mongodb://" + process.env.MONGO_HOST + "/flights",() => {
    console.log("Connected to MongoDB");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
