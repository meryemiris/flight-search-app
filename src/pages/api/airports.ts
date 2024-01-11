import { NextApiRequest, NextApiResponse } from "next";
import airportsData from "../../data/airports.json";

type AirportsData = {
  code: string;
  name: string;
  city: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AirportsData[]>
) {
  const airports: AirportsData[] = airportsData.airports;

  res.status(200).json(airports);
}
