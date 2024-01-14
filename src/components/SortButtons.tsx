import styles from "./SortButtons.module.css";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const SORT_OPTIONS = [
  {
    value: "departureTime",
    label: "Departure Time",
  },
  {
    value: "arrivalTime",
    label: "Arrival Time",
  },
  {
    value: "duration",
    label: "Duration",
  },
  {
    value: "price",
    label: "Price",
  },
];

type SortButtonProps = {
  onSort: (val: string) => void;
  activeSortBy: string;
  isAscending: boolean;
};

const SortButtons: React.FC<SortButtonProps> = ({
  onSort,
  activeSortBy,
  isAscending,
}) => {
  return (
    <div className={styles.sortBy}>
      {SORT_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onSort(value)}
          className={activeSortBy === value ? styles.activeSort : ""}
        >
          {label}
          {activeSortBy === value ? (
            isAscending ? (
              <FaSortUp />
            ) : (
              <FaSortDown />
            )
          ) : (
            <FaSort />
          )}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
