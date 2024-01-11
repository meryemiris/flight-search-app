import styles from "./FlightSearch.module.css";

const currentTime = new Date().toISOString().split("T")[0];

export default function FlightSearch() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Find your flight</h1>
      <div className={styles.flightSearch}>
        <div className={styles.searchType}>
          <input type="radio" name="searchType" value="oneWay" />
          <label htmlFor="oneWay">one way</label>
          <input type="radio" name="searchType" value="roundTrip" />
          <label htmlFor="roundTrip">round trip</label>
        </div>
        <form className={styles.searchForm}>
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
              name="date"
              defaultValue={currentTime}
              min={currentTime}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.searchLabel} htmlFor="date">
              Return
            </label>
            <input
              className={styles.searchInput}
              type="date"
              name="date"
              min={currentTime}
              defaultValue={currentTime}
            />
          </div>

          <button className={styles.searchButton} type="submit">
            Find Flights
          </button>
        </form>
      </div>
    </main>
  );
}
