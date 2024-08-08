import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useGetPokemonQuery } from "../../api/pokemonApi";
import PokemonCard from "./PokemonCard";
import PaginationControls from "../Search/PaginationControls";
import FilterControls from "../Search/FiltersControls";
import SearchInput from "../Search/SearchInput";
import { Grid, CircularProgress, Snackbar } from "@mui/material";
import "../../styles/pokemon.css";
import { Pokemon } from "../../interfaces/Pokemon";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPage } from "../../store/slices/pokemonSlice";
import { RootState } from "../../store/store";

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, sort, searchQuery, page, pageSize, captured } = useAppSelector(
    (state: RootState) => state.pokemon
  );

  const [initialLoad, setInitialLoad] = useState(true);

  // Update initial load state after the first render, fetch once on init
  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const { data, error, isLoading, isFetching } = useGetPokemonQuery(
    {
      page,
      pageSize,
      type,
      sort,
      searchQuery,
    },
    { skip: initialLoad }
  );

  const [captureMessage, setCaptureMessage] = useState<string | null>(null);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(setPage(value));
    },
    [dispatch]
  );

  const processedData = useMemo(() => {
    return data?.data.map((pokemon: Pokemon) => {
      const key = `${pokemon.number}-${pokemon.name}`;
      return {
        ...pokemon,
        captured: !!captured[key] || pokemon.captured,
      };
    });
  }, [data, captured]);

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="filters">
        <FilterControls />
        <SearchInput />
      </div>
      {isLoading || isFetching ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} className="pokemon-grid">
          {processedData?.map((pokemon: Pokemon) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={pokemon.name + pokemon.number}
            >
              <PokemonCard
                pokemon={pokemon}
                setCaptureMessage={setCaptureMessage}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <div className="pagination">
        <PaginationControls
          currentPage={Number(page)}
          totalPages={data?.total_pages || 0}
          onPageChange={handlePageChange}
        />
      </div>
      <Snackbar
        open={Boolean(captureMessage)}
        autoHideDuration={3000}
        onClose={() => setCaptureMessage(null)}
        message={captureMessage}
      />
    </>
  );
};

export default PokemonList;
