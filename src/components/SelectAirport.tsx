import AsyncSelect from "react-select/async";
import styles from "./SelectAirport.module.css";

type Props = {
  loadOptions: (value: string) => Promise<any>;

  name: string;
  label: string;
};

const SelectAirport = ({ loadOptions, name, label }: Props) => {
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
        name={name}
        placeholder=""
      />
    </div>
  );
};

export default SelectAirport;
