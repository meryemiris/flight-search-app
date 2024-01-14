import { useRef, useState } from "react";

import styles from "./FlightSearch.module.css";
import searchFormStyles from "./SearchForm.module.css";
import FlightList from "./FlightList";
import SelectAirport from "./SelectAirport";
import { MdChangeCircle } from "react-icons/md";
import { IoIosAirplane } from "react-icons/io";
import { AirportData, FlightData } from "@/types";

export default function FlightSearch() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureAirport, setDepartureAirport] = useState<AirportData | null>(
    null,
  );
  const [arrivalAirport, setArrivalAirport] = useState<AirportData | null>(
    null,
  );
  const [flightData, setFlightData] = useState<FlightData[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSortBy, setActiveSortBy] = useState<string>("duration");
  const [isAscending, setIsAscending] = useState<boolean>(false);

  const queryRef = useRef<URLSearchParams | null>(null);

  async function handleFlightSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const departureAirport = formData.get("departureAirport");
    const arrivalAirport = formData.get("arrivalAirport");
    const departureDate = formData.get("departureDate") as string | null; // 2024-01-17
    const returnDate = isRoundTrip
      ? (formData.get("returnDate") as string)
      : null;

    if (!departureAirport) {
      return setErrorMessage("Please select a departure airport.");
    }

    if (!arrivalAirport) {
      return setErrorMessage("Please select an arrival airport.");
    }

    if (departureAirport === arrivalAirport) {
      return setErrorMessage(
        "Departure and arrival airports cannot be the same.",
      );
    }

    if (!departureDate) {
      return setErrorMessage("Please select a departure date.");
    }

    if (isRoundTrip && !returnDate) {
      return setErrorMessage("Please select a return date.");
    }

    if (
      isRoundTrip &&
      returnDate &&
      new Date(departureDate as string) > new Date(returnDate)
    ) {
      return setErrorMessage("Return date could not be before departure date.");
    }

    setErrorMessage(null);
    setLoading(true);

    const queryParams = new URLSearchParams({
      departureAirport: departureAirport as string,
      arrivalAirport: arrivalAirport as string,
      departureDate: departureDate as string,
      returnDate: returnDate as string,
      sortBy: activeSortBy,
      ascending: String(isAscending),
    });

    queryRef.current = queryParams;

    try {
      const response = await fetch(`/api/flights?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Not ok response");
      }

      if (data.length === 0) {
        setErrorMessage(
          "Oops! No flights found for the selected criteria. Please try again with different options.",
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

  const onSort = async (sortBy: string, asc: boolean | null) => {
    try {
      if (!queryRef.current) {
        return console.error("No query params found");
      }

      queryRef.current.set("sortBy", sortBy);
      queryRef.current.set("ascending", String(asc));

      const response = await fetch(`/api/flights?${queryRef.current}`);
      const data = await response.json();

      if (data.length === 0) {
        setErrorMessage(
          "Oops! No flights found for the selected criteria. Please try again with different options.",
        );
      } else {
        setFlightData(data);
      }
    } catch (error) {
      setErrorMessage("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  function handleSearchType(event: React.ChangeEvent<HTMLInputElement>) {
    setIsRoundTrip(event.target.value === "roundTrip");
  }

  const handleSwitchAirport = () => {
    const from = departureAirport;
    const to = arrivalAirport;
    setDepartureAirport(to);
    setArrivalAirport(from);
  };

  const todaysDate = new Date().toISOString().split("T")[0];

  return (
    <>
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

          <form
            className={searchFormStyles.searchForm}
            onSubmit={handleFlightSearch}
          >
            <div className={searchFormStyles.inputContainer}>
              <SelectAirport
                label="From City/Airport"
                name="departureAirport"
                value={departureAirport}
                onChange={setDepartureAirport}
              />
              <button
                className={searchFormStyles.changeButton}
                onClick={handleSwitchAirport}
                type="button"
              >
                <MdChangeCircle className={searchFormStyles.changeIcon} />
              </button>
              <SelectAirport
                label="To City/Airport"
                name="arrivalAirport"
                value={arrivalAirport}
                onChange={setArrivalAirport}
              />
            </div>
            <div className={searchFormStyles.inputContainer}>
              <div className={searchFormStyles.inputGroup}>
                <label
                  className={searchFormStyles.searchLabel}
                  htmlFor="departureDate"
                >
                  Departure
                </label>
                <input
                  id="departureDate"
                  className={searchFormStyles.dateInput}
                  type="date"
                  name="departureDate"
                  defaultValue={todaysDate}
                  min={todaysDate}
                />
              </div>
              {isRoundTrip && (
                <div className={searchFormStyles.inputGroup}>
                  <label
                    className={searchFormStyles.searchLabel}
                    htmlFor="returnDate"
                  >
                    Return
                  </label>
                  <input
                    id="returnDate"
                    className={searchFormStyles.dateInput}
                    type="date"
                    name="returnDate"
                    min={todaysDate}
                  />
                </div>
              )}
            </div>

            <button className={searchFormStyles.searchButton} type="submit">
              Find Flights
              <IoIosAirplane className={searchFormStyles.airplaneIcon} />
            </button>
          </form>
        </main>
      </div>

      <div className={styles.flightResults}>
        <FlightList
          flights={flightData}
          errorMessage={errorMessage}
          loading={loading}
          activeSortBy={activeSortBy}
          setActiveSortBy={setActiveSortBy}
          isAscending={isAscending}
          setIsAscending={setIsAscending}
          onSort={onSort}
        />
      </div>
    </>
  );
}
