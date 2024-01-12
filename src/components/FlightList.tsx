import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import styles from "./FlightList.module.css";
import { FaSort } from "react-icons/fa";

type Flight = {
  id: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: number;
};

type FlightListProps = {
  flights: Flight[];
};

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  return (
    <>
      {flights?.length > 0 ? (
        <div className={styles.flightResults}>
          <div className={styles.sortBy}>
            <button>
              price <FaSort />
            </button>
            <button>
              duration <FaSort />
            </button>
            <button>
              departure time <FaSort />
            </button>
            <button>
              arrival time <FaSort />
            </button>
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
              )
            )}
          </ul>
        </div>
      ) : (
        <p>No flights found</p>
      )}
    </>
  );
};

export default FlightList;
