import AsyncSelect from "react-select/async";
import styles from "./FlightSearch.module.css";
type Props = {
  loadOptions: (value: string) => Promise<any>;
  onChange: (value: any) => void;
  name: string;
  label: string;
};

const SelectAirport = ({ loadOptions, onChange, name, label }: Props) => {
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
        cacheOptions
        defaultOptions
        loadOptions={(inputValue) => loadOptions(inputValue)}
        onChange={onChange}
        name={name}
        placeholder=""
      />
    </div>
  );
};

export default SelectAirport;
