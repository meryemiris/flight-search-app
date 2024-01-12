import { useState } from "react";
import styles from "./FlightSearch.module.css";
import FlightList from "./FlightList";

import SearchForm from "./SearchForm";
import { Airport } from "@/pages/api/airports";

type Flight = {
  id: string;
  departureAirport: string;
  arrivalAirport: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: number;
};

export default function FlightSearch() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [flightData, setFlightData] = useState<Flight[]>([]);

  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [airportOpt, setAirportOpt] = useState<Airport[]>([]);

  const fetchAirportOptions = async (inputValue: string) => {
    if (inputValue.trim() === "") {
      return [];
    }
    const response = await fetch(`/api/airports?query=${inputValue}`);
    const data = await response.json();
    console.log(data);

    setAirportOpt(data);
    return data;
  };

  async function handleFlightSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const departureAirport = formData.get("departureAirport");
    const arrivalAirport = formData.get("arrivalAirport");
    const departureDate = formData.get("departureDate");
    const returnDate = isRoundTrip ? formData.get("returnDate") : null;

    const queryParams = new URLSearchParams({
      departureAirport: departureAirport as string,
      arrivalAirport: arrivalAirport as string,
      departureDate: departureDate as string,
      returnDate: returnDate as string,
    });

    try {
      const response = await fetch(`/api/flights?${queryParams.toString()}`);
      const data = await response.json();

      setFlightData(data);
    } catch (error) {
      console.error("Error fetching flight data", error);
    }
  }

  function handleAirportSearch(selectedOption: any) {
    setSelectedAirport(selectedOption ? selectedOption.data : null);
  }

  function handleSearchType(event: React.ChangeEvent<HTMLInputElement>) {
    setIsRoundTrip(event.target.value === "roundTrip");
    console.log("from radio buttons:", event.target.value);
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Find your flight</h1>
      <div className={styles.flightSearch}>
        <div className={styles.searchType}>
          <input
            id="oneWay"
            type="radio"
            name="searchType"
            value="oneWay"
            checked={!isRoundTrip}
            onChange={handleSearchType}
          />
          <label htmlFor="oneWay">one way</label>

          <input
            id="roundTrip"
            type="radio"
            name="searchType"
            value="roundTrip"
            checked={isRoundTrip}
            onChange={handleSearchType}
          />
          <label htmlFor="roundTrip">round trip</label>
        </div>

        <SearchForm
          handleFlightSearch={handleFlightSearch}
          isRoundTrip={isRoundTrip}
          fetchAirportOptions={fetchAirportOptions}
          handleAirportSearch={handleAirportSearch}
        />
      </div>

      <FlightList flights={flightData} />
    </main>
  );
}
