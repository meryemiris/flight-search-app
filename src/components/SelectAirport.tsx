import AsyncSelect from "react-select/async";
import styles from "./SelectAirport.module.css";
import { useState } from "react";
import { Airport } from "./SearchForm";

const fetchAirportOptions = async (val: string) => {
  if (val.trim() === "") {
    return [];
  }

  const res = await fetch(`/api/airports?query=${val}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const airportData = (await res.json()) as Airport[];
  return airportData;
};

type Props = {
  name: string;
  label: string;
  value: Airport | null;
  onChange: (value: Airport | null) => void;
};

const SelectAirport = ({ name, label, value, onChange }: Props) => {
  return (
    <div className={styles.inputGroup}>
      <p className={styles.searchLabel}>{label}</p>
      <AsyncSelect
        styles={{
          indicatorsContainer: () => ({
            display: "none",
          }),
          control: () => ({
            border: "none",
          }),
        }}
        className={styles.searchInput}
        isClearable
        isSearchable
        cacheOptions
        defaultOptions
        loadOptions={(inputValue) => fetchAirportOptions(inputValue)}
        name={name}
        placeholder=""
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectAirport;
