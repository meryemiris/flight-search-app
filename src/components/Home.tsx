import { useRef, useState } from "react";

import styles from "./Home.module.css";
import SortButtons from "./SortButtons";
import FlightList from "./FlightList";
import Form from "./Form";
import { AirportData, FlightData } from "@/types";

export default function Home() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureAirport, setDepartureAirport] = useState<AirportData | null>(
    null,
  );
  const [arrivalAirport, setArrivalAirport] = useState<AirportData | null>(
    null,
  );
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [activeSortBy, setActiveSortBy] = useState<string>("duration");
  const [isAscending, setIsAscending] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const queryRef = useRef<URLSearchParams | null>(null);

  const handleFlightSearch = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
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
      }

      setFlightData(data);
    } catch (error) {
      setErrorMessage("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onSort = async (clickedSortBy: string) => {
    try {
      if (!queryRef.current) {
        return console.error("No query params found");
      }

      let currentAscending = isAscending;

      // if the same sort option is clicked again, reverse the sort order
      if (activeSortBy === clickedSortBy) {
        currentAscending = !currentAscending;
        setIsAscending((prevState) => !prevState);
      }

      setActiveSortBy(clickedSortBy);

      queryRef.current.set("sortBy", clickedSortBy);
      queryRef.current.set("ascending", String(currentAscending));

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

  const handleSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoundTrip(event.target.value === "roundTrip");
  };

  const handleSwitchAirport = () => {
    const from = departureAirport;
    const to = arrivalAirport;
    setDepartureAirport(to);
    setArrivalAirport(from);
  };

  return (
    <>
      <Form
        handleFlightSearch={handleFlightSearch}
        handleSearchType={handleSearchType}
        isRoundTrip={isRoundTrip}
        departureAirport={departureAirport}
        setDepartureAirport={setDepartureAirport}
        arrivalAirport={arrivalAirport}
        setArrivalAirport={setArrivalAirport}
        handleSwitchAirport={handleSwitchAirport}
      />

      <div className={styles.flightResults}>
        {!loading && !errorMessage && flightData.length ? (
          <SortButtons
            activeSortBy={activeSortBy}
            isAscending={isAscending}
            onSort={onSort}
          />
        ) : null}
        <FlightList
          flights={flightData}
          errorMessage={errorMessage}
          loading={loading}
        />
      </div>
    </>
  );
}
