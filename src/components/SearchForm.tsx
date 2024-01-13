import { FormEvent, useState } from "react";
import styles from "./SearchForm.module.css";
import SelectAirport from "./SelectAirport";
import { MdChangeCircle } from "react-icons/md";
import { IoIosAirplane } from "react-icons/io";
import { AirportData } from "@/types";

const currentTime = new Date().toISOString().split("T")[0];

type Props = {
  handleFlightSearch: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isRoundTrip: boolean;
};

export default function SearchForm({ handleFlightSearch, isRoundTrip }: Props) {
  const [fromAirport, setFromAirport] = useState<AirportData | null>(null);
  const [toAirport, setToAirport] = useState<AirportData | null>(null);

  const handleSwitchAirport = () => {
    const from = fromAirport;
    const to = toAirport;
    setFromAirport(to);
    setToAirport(from);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleFlightSearch}>
      <SelectAirport
        label="From City/Airport"
        name="departureAirport"
        value={fromAirport}
        onChange={setFromAirport}
      />

      <button className={styles.changeButton} onClick={handleSwitchAirport}>
        <MdChangeCircle className={styles.changeIcon} />
      </button>

      <SelectAirport
        label="To City/Airport"
        name="arrivalAirport"
        value={toAirport}
        onChange={setToAirport}
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
