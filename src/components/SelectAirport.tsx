import AsyncSelect from "react-select/async";
import { components } from "react-select";
import styles from "./SelectAirport.module.css";
import { AirportData } from "../types";

const fetchAirportOptions = async (val: string) => {
  if (val.trim() === "") {
    return [];
  }

  const res = await fetch(`/api/airports?query=${val}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const airportData = (await res.json()) as AirportData[];
  return airportData;
};

type Props = {
  name: string;
  label: string;
  value: AirportData | null;
  onChange: (value: AirportData | null) => void;
};

const SelectAirport = ({ name, label, value, onChange }: Props) => {
  return (
    <div className={styles.inputGroup}>
      <p className={styles.searchLabel}>{label}</p>
      <AsyncSelect
        id={name}
        instanceId={name}
        //react-select causes a hydration error, see
        // https://github.com/JedWatson/react-select/issues/5459#issuecomment-1875022105
        components={{
          Input: (props) => (
            <components.Input {...props} aria-activedescendant={undefined} />
          ),
        }}
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
