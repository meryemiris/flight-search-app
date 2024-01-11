import { NextApiRequest, NextApiResponse } from "next";
import flightsData from "../../../public/flights.json";

type FlightData = {
  id: string;
  departureAirport: string;
  arrivalAirport: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlightData[]>
) {
  const flights: FlightData[] = flightsData.flights;

  res.status(200).json(flights);
}
