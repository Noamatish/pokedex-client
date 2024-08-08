import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "../api/pokemonApi";
import pokemonReducer from "../store/slices/pokemonSlice";
import PokemonCard from "../components/Pokemon/PokemonCard";

const renderWithStore = (component: React.ReactElement, store: any) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("PokemonCard", () => {
  const mockPokemon = {
    number: 1,
    name: "Bulbasaur",
    type_one: "Grass",
    type_two: "Poison",
    image_url: "https://img.pokemondb.net/sprites/silver/normal/bulbasaur.png",
    captured: false,
  };

  const createTestStore = () =>
    configureStore({
      reducer: {
        pokemon: pokemonReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });

  test("renders PokemonCard component", () => {
    const store = createTestStore();

    renderWithStore(
      <PokemonCard pokemon={mockPokemon} setCaptureMessage={jest.fn()} />,
      store
    );

    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Type: Grass \/ Poison/i)).toBeInTheDocument();
  });

  test("captures Pokemon on button click", async () => {
    const store = createTestStore();

    renderWithStore(
      <PokemonCard pokemon={mockPokemon} setCaptureMessage={jest.fn()} />,
      store
    );

    const captureButton = screen.getByText(/Capture/i);
    fireEvent.click(captureButton);

    // Use waitFor to wait for async state updates
    await waitFor(() => {
      const state = store.getState().pokemon;
      console.log("Captured state:", state.captured);
      expect(state.captured).toHaveProperty("1-Bulbasaur", true);
    });
  });

  test("disables button when Pokemon is captured", () => {
    const store = createTestStore();
    const capturedPokemon = { ...mockPokemon, captured: true };

    renderWithStore(
      <PokemonCard pokemon={capturedPokemon} setCaptureMessage={jest.fn()} />,
      store
    );

    const captureButton = screen.getByText(/Captured/i);
    expect(captureButton).toBeDisabled();
  });
});
