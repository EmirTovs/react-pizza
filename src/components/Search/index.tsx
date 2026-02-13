import React from "react";
import debounce from "lodash.debounce";

import { searchCategory } from "../../redux/slice/Filters";
import { useDispatch } from "react-redux";

import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(searchCategory(str));
    }, 500),
    [],
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  const onClickClear = () => {
    searchCategory("");
    inputRef.current?.focus();
  };
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск пиццы..."
        onChange={(event) => {
          onChangeInput(event);
        }}
        className={styles.input}
        value={value}
        name="search"
      />
    </div>
  );
};

export default Search;
