export type FlightData = {
  id: string;
  departureAirport: string;
  arrivalAirport: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: number;
};

export type AirportData = {
  value: string;
  label: string;
};
