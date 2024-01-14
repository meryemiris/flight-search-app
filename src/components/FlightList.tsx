import { useState } from "react";

import styles from "./FlightList.module.css";

import { FlightData } from "@/types";
import Loader from "./Loader";

import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { GrSort } from "react-icons/gr";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { GrAscend } from "react-icons/gr";
import { GrDescend } from "react-icons/gr";

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
};

const FlightList: React.FC<FlightListProps> = ({
  flights,
  errorMessage,
  loading,
  onSort,
}) => {
  const [activeSortBy, setActiveSortBy] = useState<string>("");

  const [sortOrders, setSortOrders] = useState<{
    [key: string]: boolean | null;
  }>(Object.fromEntries(SORT_OPTIONS.map(({ value }) => [value, true])));

  const sortFlightsBy = (value: string) => {
    setSortOrders((prevSortOrders) => {
      const isAscending =
        prevSortOrders[value] === null ? true : !prevSortOrders[value];

      const newSortOrders = { ...prevSortOrders, [value]: isAscending };

      setActiveSortBy(value);

      Object.keys(newSortOrders)
        .filter((key) => key !== value)
        .forEach((key) => (newSortOrders[key] = null));

      return newSortOrders;
    });

    onSort(value, sortOrders[value]);
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
              {sortOrders[value] === null && <FaSort />}

              {activeSortBy === value && (
                <>
                  {sortOrders[value] === true ? <FaSortDown /> : <FaSortUp />}
                </>
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
