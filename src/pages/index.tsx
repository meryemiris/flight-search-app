import FlightSearch from "@/components/FlightSearch";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Flight Search</title>
        <meta name="description" content="find your flight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <FlightSearch />
    </>
  );
}
