import AsyncSelect from "react-select/async";
import styles from "./FlightSearch.module.css";
type Props = {
  loadOptions: (value: string) => Promise<any>;
  onChange: (value: any) => void;
  name: string;
  placeholder: string;
};

const AsyncSelectAirport = ({
  loadOptions,
  onChange,
  name,
  placeholder,
}: Props) => {
  return (
    <AsyncSelect
      styles={{
        indicatorsContainer: () => ({
          display: "none",
        }),
      }}
      className={styles.searchInput}
      isClearable
      cacheOptions
      defaultOptions
      loadOptions={(inputValue) => loadOptions(inputValue)}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default AsyncSelectAirport;
