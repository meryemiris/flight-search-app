import { useState } from "react";

import styles from "./FlightSearch.module.css";

import FlightList from "./FlightList";
import SearchForm from "./SearchForm";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAirportOptions = async (val: string) => {
    if (val.trim() === "") {
      return [];
    }

    const res = await fetch(`/api/airports?query=${val}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const airportData = await res.json();

    return airportData;
  };

  async function handleFlightSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

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

      if (data.length === 0) {
        setErrorMessage(
          "Oops! No flights found for the selected criteria. Please try again with different options."
        );
      } else {
        setFlightData(data);
      }
    } catch (error) {
      setErrorMessage("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
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
        />
      </div>

      <FlightList
        flights={flightData}
        errorMessage={errorMessage}
        loading={loading}
      />
    </main>
  );
}
