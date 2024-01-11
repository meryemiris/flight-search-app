import { useState } from "react";
import styles from "./FlightSearch.module.css";

const currentTime = new Date().toISOString().split("T")[0];

export default function FlightSearch() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  function handleFlightSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const departureAirport = formData.get("departureAirport");
    const arrivalAirport = formData.get("arrivalAirport");
    const departureDate = formData.get("date");
    const returnDate = isRoundTrip ? formData.get("date") : null;

    console.log(
      "departureAirport:",
      departureAirport,
      "arrivalAirport:",
      arrivalAirport,
      "departureDate:",
      departureDate,
      "returnDate:",
      returnDate
    );
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
            <label className={styles.searchLabel} htmlFor="date">
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
              <label className={styles.searchLabel} htmlFor="date">
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
    </main>
  );
}
