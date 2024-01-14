import styles from "./FlightList.module.css";

import { FlightData } from "@/types";
import Loader from "./Loader";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";

type FlightListProps = {
  flights: FlightData[];
  errorMessage: string | null;
  loading: boolean;
};

const FlightList: React.FC<FlightListProps> = ({
  flights,
  errorMessage,
  loading,
}) => {
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
    );
  }

  return null;
};

export default FlightList;
