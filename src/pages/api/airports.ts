import { NextApiRequest, NextApiResponse } from "next";
import airportsData from "../../data/airports.json";
import { AirportData } from "@/types";

type Airport = {
  code: string;
  name: string;
  city: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AirportData[]>
) {
  const airports: Airport[] = airportsData.airports;
  const query = req.query.query as string;

  const filteredAirports: Airport[] = airports.filter(
    (airport) =>
      airport.code.toLowerCase().includes(query.toLowerCase()) ||
      airport.name.toLowerCase().includes(query.toLowerCase()) ||
      airport.city.toLowerCase().includes(query.toLowerCase())
  );

  const asyncSelectOptions: AirportData[] = filteredAirports.map((airport) => ({
    value: airport.code,
    label: `${airport.city} (${airport.name}) - ${airport.code}`,
  }));

  res.status(200).json(asyncSelectOptions);
}
