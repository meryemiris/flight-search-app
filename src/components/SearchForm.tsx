import { FormEvent } from "react";
import styles from "./SearchForm.module.css";
import SelectAirport from "./SelectAirport";

const currentTime = new Date().toISOString().split("T")[0];

type Props = {
  handleAirportSearch: (selectedOption: any) => void;
  handleFlightSearch: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  fetchAirportOptions: (inputValue: string) => Promise<any>;
  isRoundTrip: boolean;
};

export default function SearchForm({
  handleAirportSearch,
  handleFlightSearch,
  fetchAirportOptions,
  isRoundTrip,
}: Props) {
  return (
    <form className={styles.searchForm} onSubmit={handleFlightSearch}>
      <SelectAirport
        label="From City/Airport"
        loadOptions={fetchAirportOptions}
        onChange={handleAirportSearch}
        name="departureAirport"
      />

      <SelectAirport
        label="To City/Airport"
        loadOptions={fetchAirportOptions}
        onChange={handleAirportSearch}
        name="arrivalAirport"
      />

      <div className={styles.inputGroup}>
        <label className={styles.searchLabel} htmlFor="departureDate">
          Departure
        </label>
        <input
          id="departureDate"
          className={styles.dateInput}
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
            id="returnDate"
            className={styles.dateInput}
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
  );
}
