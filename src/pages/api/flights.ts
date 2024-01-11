import { NextApiRequest, NextApiResponse } from "next";
import flightsData from "../../data/flights.json";

type FlightData = {
  id: string;
  departureAirport: string;
  arrivalAirport: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlightData[] | ErrorResponse>
) {
  const { departureAirport, arrivalAirport, departureDate, returnDate } =
    req.query;

  if (!departureAirport || !arrivalAirport || !departureDate) {
    const errorResponse: ErrorResponse = { error: "Invalid parameters" };
    return res.status(400).json(errorResponse);
  }

  const flights: FlightData[] = flightsData.flights.filter((flight) => {
    return (
      flight.departureAirport === departureAirport &&
      flight.arrivalAirport === arrivalAirport &&
      flight.departureTime.includes(departureDate as string)
    );
  });

  if (returnDate) {
    const returnFlights: FlightData[] = flightsData.flights.filter((flight) => {
      return (
        flight.departureAirport === arrivalAirport &&
        flight.arrivalAirport === departureAirport &&
        flight.departureTime.includes(returnDate as string)
      );
    });

    res.status(200).json([...flights, ...returnFlights]);
  } else {
    res.status(200).json(flights);
  }

  console.log(req.body);
}
