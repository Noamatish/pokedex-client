import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PokemonState {
  type: string | undefined;
  sort: string;
  searchQuery: string;
  page: number;
  pageSize: number;
  captured: Record<string, boolean>;
}

const initialState: PokemonState = {
  type: localStorage.getItem("type") || "",
  sort: localStorage.getItem("sort") || "asc",
  searchQuery: "",
  page: Number(localStorage.getItem("currentPage")) || 1,
  pageSize: Number(localStorage.getItem("pageSize")) || 10,
  captured: {},
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<string | undefined>) {
      state.type = action.payload;
      localStorage.setItem("type", action.payload || "");
      state.page = 1;
      localStorage.setItem("currentPage", "1");
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
      localStorage.setItem("sort", action.payload);
      state.page = 1;
      localStorage.setItem("currentPage", "1");
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.page = 1;
      localStorage.setItem("currentPage", "1");
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
      localStorage.setItem("currentPage", action.payload.toString());
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      localStorage.setItem("pageSize", action.payload.toString());
      state.page = 1;
      localStorage.setItem("currentPage", "1");
    },
    setCapturePokemon(
      state,
      action: PayloadAction<{ number: number; name: string }>
    ) {
      const { number, name } = action.payload;
      state.captured[`${number}-${name}`] = true;
    },
  },
});

export const {
  setType,
  setSort,
  setSearchQuery,
  setPage,
  setPageSize,
  setCapturePokemon,
} = pokemonSlice.actions;

export const selectPokemonState = (state: RootState) => state.pokemon;

export default pokemonSlice.reducer;
