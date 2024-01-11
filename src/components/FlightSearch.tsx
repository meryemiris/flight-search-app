import { useEffect, useState } from "react";
import styles from "./FlightSearch.module.css";

const currentTime = new Date().toISOString().split("T")[0];

type flight = {
  id: string;
  departureAirport: string;
  arrivalAirport: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

export default function FlightSearch() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [flightData, setFlightData] = useState<flight[]>([]);

  async function handleFlightSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const departureAirport = formData.get("departureAirport");
    const arrivalAirport = formData.get("arrivalAirport");
    const departureDate = formData.get("departureDate");
    const returnDate = isRoundTrip ? formData.get("returnDate") : null;

    console.log(
      "data before query params:",
      "departureAirport:",
      departureAirport,
      "arrivalAirport:",
      arrivalAirport,
      "departureDate:",
      departureDate,
      "returnDate:",
      returnDate
    );

    const queryParams = new URLSearchParams({
      departureAirport: departureAirport as string,
      arrivalAirport: arrivalAirport as string,
      departureDate: departureDate as string,
      returnDate: returnDate as string,
    });

    console.log("queryParams:", queryParams);

    try {
      const response = await fetch(`/api/flights?${queryParams.toString()}`);
      const data = await response.json();
      console.log("data:", data);
      setFlightData(data);
    } catch (error) {
      console.error("Error fetching flight data", error);
    }
  }

  function handleAirportSearch() {}

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
            type="radio"
            name="searchType"
            value="oneWay"
            checked={!isRoundTrip}
            onChange={handleSearchType}
          />
          <label htmlFor="oneWay">one way</label>

          <input
            type="radio"
            name="searchType"
            value="roundTrip"
            checked={isRoundTrip}
            onChange={handleSearchType}
          />
          <label htmlFor="roundTrip">round trip</label>
        </div>
        <form className={styles.searchForm} onSubmit={handleFlightSearch}>
          <div className={styles.inputGroup}>
            <label className={styles.searchLabel} htmlFor="departureAirport">
              From City/Airport
            </label>
            <input
              className={styles.searchInput}
              type="text"
              name="departureAirport"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.searchLabel} htmlFor="arrivalAirport">
              To City/Airport:
            </label>
            <input
              className={styles.searchInput}
              type="text"
              name="arrivalAirport"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.searchLabel} htmlFor="departureDate">
              Departure
            </label>
            <input
              className={styles.searchInput}
              type="date"
              name="departureDate"
              defaultValue={currentTime}
              min={currentTime}
            />
          </div>
          {isRoundTrip && (
            <div className={styles.inputGroup}>
              <label className={styles.searchLabel} htmlFor="returnDate">
                Return
              </label>
              <input
                className={styles.searchInput}
                type="date"
                name="returnDate"
                min={currentTime}
                defaultValue={currentTime}
              />
            </div>
          )}

          <button className={styles.searchButton} type="submit">
            Find Flights
          </button>
        </form>
      </div>

      {flightData?.length > 0 ? (
        <div className={styles.flightResults}>
          <h2>Flight Results</h2>
          <ul>
            {flightData.map((flight) => (
              <li key={flight.id}>
                <p>Airline: {flight.airline}</p>
                <p>Departure Airport: {flight.departureAirport}</p>
                <p>Arrival Airport: {flight.arrivalAirport}</p>
                <p>Departure Time: {flight.departureTime}</p>
                <p>Arrival Time: {flight.arrivalTime}</p>
                <p>Price: ${flight.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No flights found</p>
      )}
    </main>
  );
}
