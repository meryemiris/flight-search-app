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
  duration: number;
};

type ErrorResponse = {
  error: string;
};

const sortByProperty = (
  flights: FlightData[],
  property: keyof FlightData,
  ascending: boolean = true
): FlightData[] => {
  return flights.sort((a, b) => {
    if (ascending) {
      return a[property] > b[property] ? 1 : -1;
    } else {
      return a[property] < b[property] ? 1 : -1;
    }
  });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlightData[] | ErrorResponse>
) {
  const {
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    sortBy,
  } = req.query;

  //
  // if (!departureAirport || !arrivalAirport || !departureDate) {
  //   const errorResponse: ErrorResponse = { error: "Invalid parameters" };
  //   return res.status(400).json(errorResponse);
  // }

  let flights: FlightData[] = flightsData.flights.filter((flight) => {
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

    flights = [...flights, ...returnFlights];
  }

  switch (sortBy) {
    case "price":
    case "duration":
      flights = sortByProperty(flights, sortBy);
      break;
    case "departureTime":
    case "arrivalTime":
      flights = sortByProperty(flights, sortBy, false);
      break;
    default:
      flights = sortByProperty(flights, "price");
  }
  res.status(200).json(flights);
}
