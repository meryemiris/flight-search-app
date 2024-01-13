import FlightSearch from "@/components/FlightSearch";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Beyond Horizons</title>
        <meta name="description" content="explore the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.navbar}>
        <p>BEYOND HORIZONS</p>
      </div>
      <header className={styles.header}>
        <h1>Choose Where to Explore!</h1>
      </header>
      <main>
        <FlightSearch />
      </main>
    </>
  );
}
