import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearchQuery } from "../../store/slices/pokemonSlice";
import { RootState } from "../../store/store";
import { DEBOUNCE_TIME } from "../../constants/constants";
import useDebounce from "../../hooks/useDebounce";

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const initialSearchQuery = useAppSelector(
    (state: RootState) => state.pokemon.searchQuery
  );

  const [searchTerm, setSearchTerm] = useState<string>(initialSearchQuery);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_TIME); // ms debounce time

  useEffect(() => {
    //handle unnecessary render initial
    if (debouncedSearchTerm !== initialSearchQuery) {
      dispatch(setSearchQuery(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch, initialSearchQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      label="Free text search"
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
      fullWidth
      margin="normal"
      className="search-input"
    />
  );
};

export default SearchInput;
