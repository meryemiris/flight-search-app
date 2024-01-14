import SelectAirport from "./SelectAirport";
import styles from "./Form.module.css";
import { MdChangeCircle } from "react-icons/md";
import { IoIosAirplane } from "react-icons/io";
import { AirportData } from "@/types";

type FormProps = {
  isRoundTrip: boolean;
  handleSearchType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFlightSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  departureAirport: AirportData | null;
  setDepartureAirport: (value: AirportData | null) => void;
  arrivalAirport: AirportData | null;
  setArrivalAirport: (value: AirportData | null) => void;
  handleSwitchAirport: () => void;
};

const Form: React.FC<FormProps> = ({
  isRoundTrip,
  handleSearchType,
  handleFlightSearch,
  departureAirport,
  setDepartureAirport,
  arrivalAirport,
  setArrivalAirport,
  handleSwitchAirport,
}) => {
  const todaysDate = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.flightSearch}>
      <main className={styles.searchBar}>
        <div className={styles.flightTypeContainer}>
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

        <form className={styles.searchForm} onSubmit={handleFlightSearch}>
          <div className={styles.inputContainer}>
            <SelectAirport
              label="From City/Airport"
              name="departureAirport"
              value={departureAirport}
              onChange={setDepartureAirport}
            />
            <button
              className={styles.changeButton}
              onClick={handleSwitchAirport}
              type="button"
            >
              <MdChangeCircle className={styles.changeIcon} />
            </button>
            <SelectAirport
              label="To City/Airport"
              name="arrivalAirport"
              value={arrivalAirport}
              onChange={setArrivalAirport}
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.searchLabel} htmlFor="departureDate">
                Departure
              </label>
              <input
                id="departureDate"
                className={styles.dateInput}
                type="date"
                name="departureDate"
                defaultValue={todaysDate}
                min={todaysDate}
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
                  min={todaysDate}
                />
              </div>
            )}
          </div>

          <button className={styles.searchButton} type="submit">
            Find Flights
            <IoIosAirplane className={styles.airplaneIcon} />
          </button>
        </form>
      </main>
    </div>
  );
};

export default Form;
