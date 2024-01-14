import { Dispatch, SetStateAction } from "react";

import styles from "./FlightList.module.css";

import { FlightData } from "@/types";
import Loader from "./Loader";

import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";

const SORT_OPTIONS = [
  {
    value: "departureTime",
    label: "Departure Time",
  },
  {
    value: "arrivalTime",
    label: "Arrival Time",
  },
  {
    value: "duration",
    label: "Duration",
  },
  {
    value: "price",
    label: "Price",
  },
];

type FlightListProps = {
  flights: FlightData[];
  errorMessage: string | null;
  loading: boolean;
  onSort: (val: string, isAscending: boolean | null) => void;
  activeSortBy: string;
  setActiveSortBy: (val: string) => void;
  isAscending: boolean;
  setIsAscending: Dispatch<SetStateAction<boolean>>;
};

const FlightList: React.FC<FlightListProps> = ({
  flights,
  errorMessage,
  loading,
  onSort,
  activeSortBy,
  setActiveSortBy,
  isAscending,
  setIsAscending,
}) => {
  const sortFlightsBy = (value: string) => {
    let currentAscending = isAscending;

    // if the same sort option is clicked again, reverse the sort order
    if (activeSortBy === value) {
      currentAscending = !currentAscending;
      setIsAscending((prevState) => !prevState);
    }

    setActiveSortBy(value);

    onSort(value, currentAscending);
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <div className={styles.error}>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    );
  }

  if (flights.length) {
    return (
      <>
        <div className={styles.sortBy}>
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => sortFlightsBy(value)}
              className={activeSortBy === value ? styles.activeSort : ""}
            >
              {label}
              {activeSortBy === value ? (
                isAscending ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : (
                <FaSort />
              )}
            </button>
          ))}
        </div>
        <ul>
          {flights.map(
            ({
              id,
              airline,
              departureAirport,
              arrivalAirport,
              departureTime,
              arrivalTime,
              price,
              duration,
            }) => (
              <li className={styles.flight} key={id}>
                <div className={styles.airline}>
                  <p>{airline}</p>
                </div>
                <div className={styles.departure}>
                  <time dateTime={departureTime}>
                    {new Date(departureTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  <p> {departureAirport}</p>
                </div>
                <div className={styles.duration}>
                  <GiAirplaneDeparture />
                  <p>Flight duration: {duration}h</p>
                  <GiAirplaneArrival />
                </div>

                <div className={styles.arrival}>
                  <time dateTime={arrivalTime}>
                    {new Date(arrivalTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  <p>{arrivalAirport}</p>
                </div>

                <div className={styles.price}>
                  <h6>ECONOMY</h6>
                  <p className={styles.perPassenger}>per passenger</p>
                  <p className={styles.priceValue}> ${price}</p>
                </div>
              </li>
            ),
          )}
        </ul>
      </>
    );
  }

  return null;
};

export default FlightList;
