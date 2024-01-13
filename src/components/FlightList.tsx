import styles from "./FlightList.module.css";

import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { FaSort } from "react-icons/fa";
import { FlightData } from "@/types";
import Loader from "./Loader";

type FlightListProps = {
  flights: FlightData[];
  errorMessage: string | null;
  loading: boolean;
  setSortBy: (sortBy: string) => void;
};

const FlightList: React.FC<FlightListProps> = ({
  flights,
  errorMessage,
  loading,
  setSortBy,
}) => {
  return (
    <div className={styles.flightResults}>
      {loading && <Loader />}
      {errorMessage ? (
        <div className={styles.error}>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
      ) : (
        flights.length > 0 && (
          <ul>
            <div className={styles.sortBy}>
              <button
                className={styles.sortByButton}
                onClick={() => setSortBy("departureTime")}
              >
                departure time <FaSort />
              </button>
              <button onClick={() => setSortBy("duration")}>
                duration <FaSort />
              </button>

              <button onClick={() => setSortBy("arrivalTime")}>
                arrival time <FaSort />
              </button>
              <button onClick={() => setSortBy("price")}>
                price <FaSort />
              </button>
            </div>
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
        )
      )}
    </div>
  );
};

export default FlightList;
