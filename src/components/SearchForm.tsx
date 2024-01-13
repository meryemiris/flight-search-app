import { FormEvent } from "react";
import styles from "./SearchForm.module.css";
import SelectAirport from "./SelectAirport";
import { MdChangeCircle } from "react-icons/md";
import { IoIosAirplane } from "react-icons/io";

const currentTime = new Date().toISOString().split("T")[0];

type Props = {
  handleFlightSearch: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  fetchAirportOptions: (inputValue: string) => Promise<any>;
  isRoundTrip: boolean;
};

export default function SearchForm({
  handleFlightSearch,
  fetchAirportOptions,
  isRoundTrip,
}: Props) {
  return (
    <form className={styles.searchForm} onSubmit={handleFlightSearch}>
      <SelectAirport
        label="From City/Airport"
        loadOptions={fetchAirportOptions}
        name="departureAirport"
      />

      <MdChangeCircle className={styles.changeIcon} />

      <SelectAirport
        label="To City/Airport"
        loadOptions={fetchAirportOptions}
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
          defaultValue="departure"
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
            defaultValue="return"
          />
        </div>
      )}

      <button className={styles.searchButton} type="submit">
        Find Flights
        <IoIosAirplane className={styles.airplaneIcon} />
      </button>
    </form>
  );
}
