import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import {
  setType,
  setSort,
  setPageSize,
  setPage,
  setSearchQuery,
} from "../store/slices/pokemonSlice";
import useLocalStorageState from "./useLocalStorageState";

const usePokemonQueryParams = () => {
  const dispatch = useAppDispatch();
  const { type, sort, pageSize, searchQuery } = useAppSelector(
    (state: RootState) => state.pokemon
  );

  const [storedType, setStoredType] = useLocalStorageState<string | undefined>(
    "type",
    type
  );
  const [storedSort, setStoredSort] = useLocalStorageState<string>(
    "sort",
    sort
  );
  const [storedPageSize, setStoredPageSize] = useLocalStorageState<number>(
    "pageSize",
    pageSize
  );
  const [storedSearchQuery, setStoredSearchQuery] =
    useLocalStorageState<string>("searchQuery", searchQuery);
  const [storedPage, setStoredPage] = useLocalStorageState<number>(
    "currentPage",
    1
  );

  useEffect(() => {
    if (storedType !== undefined) dispatch(setType(storedType));
    if (storedSort !== undefined) dispatch(setSort(storedSort));
    if (storedPageSize !== undefined) dispatch(setPageSize(storedPageSize));
    if (storedSearchQuery !== undefined)
      dispatch(setSearchQuery(storedSearchQuery));

    dispatch(setPage(storedPage));
  }, [
    dispatch,
    storedPage,
    storedPageSize,
    storedSearchQuery,
    storedSort,
    storedType,
  ]);

  const updateType = (value: string | undefined) => {
    dispatch(setType(value));
    setStoredType(value);
    dispatch(setPage(1));
    setStoredPage(1);
  };

  const updateSort = (value: string) => {
    dispatch(setSort(value));
    setStoredSort(value);
    dispatch(setPage(1));
    setStoredPage(1);
  };

  const updatePageSize = (value: number) => {
    dispatch(setPageSize(value));
    setStoredPageSize(value);
    dispatch(setPage(1));
    setStoredPage(1);
  };

  const updateSearchQuery = (value: string) => {
    dispatch(setSearchQuery(value));
    setStoredSearchQuery(value);
    dispatch(setPage(1));
    setStoredPage(1);
  };

  return {
    updateType,
    updateSort,
    updatePageSize,
    updateSearchQuery,
  };
};

export default usePokemonQueryParams;
