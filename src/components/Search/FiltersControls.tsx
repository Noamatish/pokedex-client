import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import usePokemonQueryParams from "../../hooks/usePokemonQuery";

const FilterControls: React.FC = () => {
  const { type, sort, pageSize } = useAppSelector(
    (state: RootState) => state.pokemon
  );
  const { updateType, updateSort, updatePageSize } = usePokemonQueryParams();

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    updateType(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    updateSort(event.target.value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<string>) => {
    const newPageSize = parseInt(event.target.value as string, 10);
    updatePageSize(newPageSize);
  };

  return (
    <div className="filter-controls">
      <FormControl>
        <InputLabel>Type</InputLabel>
        <Select value={type || ""} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Fire">Fire</MenuItem>
          <MenuItem value="Water">Water</MenuItem>
          <MenuItem value="Grass">Grass</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort</InputLabel>
        <Select value={sort} onChange={handleSortChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Page Size</InputLabel>
        <Select value={pageSize.toString()} onChange={handlePageSizeChange}>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterControls;
