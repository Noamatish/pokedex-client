// src/api/pokemonApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonApiResponse } from "../interfaces/Pokemon";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URLl ??
  "https://pokedex-server-1.onrender.com/api";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPokemon: builder.query<
      PokemonApiResponse,
      {
        page: number;
        pageSize: number;
        type?: string;
        sort?: string;
        searchQuery?: string;
      }
    >({
      query: ({ page, pageSize, type, sort, searchQuery }) => {
        let query = `pokemon?page=${page}&page_size=${pageSize}`;
        if (type) query += `&type=${type}`;
        if (sort) query += `&sort=${sort}`;
        if (searchQuery) query += `&search_query=${searchQuery}`;
        return query;
      },
    }),
    capturePokemon: builder.mutation({
      query: ({ number, name }) => ({
        url: "pokemon/capture",
        method: "POST",
        body: { number, name },
      }),
    }),
  }),
});

export const { useGetPokemonQuery, useCapturePokemonMutation } = pokemonApi;
