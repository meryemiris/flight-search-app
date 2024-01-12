import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import styles from "./FlightList.module.css";
import { FaSort } from "react-icons/fa";
import { useEffect, useState } from "react";

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
  errorMessage: string | null;
  loading: boolean;
  setFlightData: (flights: Flight[]) => void;
};

const FlightList: React.FC<FlightListProps> = ({
  flights,
  errorMessage,
  loading,
  setFlightData,
}) => {
  const [sortBy, setSortBy] = useState<string>("");
  console.log("sortBy:", sortBy);

  useEffect(() => {
    async function fetchData() {
      try {
        const queryParams = new URLSearchParams({
          sortBy,
        });

        const response = await fetch(`/api/flights?${queryParams}`);
        const data = await response.json();
        console.log("data:", data);

        if (data.length > 0) {
          setFlightData(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [sortBy, setFlightData]);

  return (
    <>
      {loading && <p>Loading...</p>}
      <div className={styles.flightResults}>
        {errorMessage ? (
          <div className={styles.error}>
            <p className={styles.errorMessage}>{errorMessage}</p>
          </div>
        ) : (
          flights.length > 0 && (
            <>
              <div className={styles.sortBy}>
                <button onClick={() => setSortBy("price")}>
                  price <FaSort />
                </button>
                <button onClick={() => setSortBy("duration")}>
                  duration <FaSort />
                </button>
                <button onClick={() => setSortBy("departureTime")}>
                  departure time <FaSort />
                </button>
                <button onClick={() => setSortBy("arrivalTime")}>
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
            </>
          )
        )}
      </div>
    </>
  );
};

export default FlightList;
