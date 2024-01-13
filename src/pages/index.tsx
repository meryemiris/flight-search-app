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
      <header className={styles.header}>
        <h1>BEYOND HORIZONS</h1>
        <h2>Choose Where to Explore!</h2>
      </header>
      <main>
        <FlightSearch />
      </main>
      <footer className={styles.footer}></footer>
    </>
  );
}
