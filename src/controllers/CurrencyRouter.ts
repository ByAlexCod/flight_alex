//express ts flight controller
import express from "express";
import ExternalCurrencyService from "../services/ExternalCurrencyService";

const router = express.Router();
const ENDPOINT = "/currency";

router.get(ENDPOINT + "/convert", async (req, res) => {
  const { to, amount } = req.query;
  
  let converted = await ExternalCurrencyService.getConversion(to as string, parseFloat(amount as string));
  res.json(converted);
 
});

export {router as CurrencyRouter};