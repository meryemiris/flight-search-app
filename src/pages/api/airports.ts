import { NextApiRequest, NextApiResponse } from "next";
import airportsData from "../../data/airports.json";

export type Airport = {
  code: string;
  name: string;
  city: string;
};

type AsyncSelectOption = {
  value: string;
  label: string;
  data: Airport;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AsyncSelectOption[]>
) {
  const airports: Airport[] = airportsData.airports;
  const query = req.query.query as string;

  const filteredAirports: Airport[] = airports.filter(
    (airport) =>
      airport.code.toLowerCase().includes(query.toLowerCase()) ||
      airport.name.toLowerCase().includes(query.toLowerCase()) ||
      airport.city.toLowerCase().includes(query.toLowerCase())
  );

  const asyncSelectOptions: AsyncSelectOption[] = filteredAirports.map(
    (airport) => ({
      value: airport.code,
      label: `${airport.name} (${airport.city}) - ${airport.code}`,
      data: airport,
    })
  );

  res.status(200).json(asyncSelectOptions);
}
