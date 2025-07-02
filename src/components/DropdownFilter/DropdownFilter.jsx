import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import css from "./DropdownFilter.module.css";

const options = [
  { label: "A to Z", value: "a-z", enabled: true },
  { label: "Z to A", value: "z-a", enabled: true },
  { label: "Less than 10$", value: "lt-10", enabled: true },
  { label: "Greater than 10$", value: "gt-10", enabled: true },
  { label: "Popular", value: "popular", enabled: true },
  { label: "Not popular", value: "not-popular", enabled: true },
  { label: "Show all", value: "all", enabled: true },
];

const DropdownFilter = ({ selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option.value);
    setOpen(false);
  };

  return (
    <div className={css.dropdown}>
      <p className={css.label}>Filters</p>
      <div className={css.header} onClick={() => setOpen(!open)}>
        {options.find((opt) => opt.value === selected)?.label ||
          "Choose filter"}
        <span className={css.arrow}>
          {open ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </span>
      </div>

      {open && (
        <div className={css.menu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${css.item} ${
                selected === option.value ? css.active : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
