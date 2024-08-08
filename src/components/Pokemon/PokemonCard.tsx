import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { useCapturePokemonMutation } from "../../api/pokemonApi";
import { setCapturePokemon } from "../../store/slices/pokemonSlice";
import { PokemonCardProps } from "../../interfaces/Pokemon";
import "../../styles/pokemon.css";

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  setCaptureMessage,
}) => {
  const dispatch = useAppDispatch();
  const [capturePokemon] = useCapturePokemonMutation();

  const handleCapture = useCallback(async () => {
    try {
      await capturePokemon({ number: pokemon.number, name: pokemon.name });
      dispatch(
        setCapturePokemon({ number: pokemon.number, name: pokemon.name })
      );
      setCaptureMessage("Pokemon captured successfully!");
    } catch (error) {
      setCaptureMessage("Failed to capture Pokemon. Try again.");
    }
  }, [
    capturePokemon,
    dispatch,
    pokemon.number,
    pokemon.name,
    setCaptureMessage,
  ]);

  return (
    <Card className="pokemon-card">
      <CardMedia
        component="img"
        alt={pokemon.name}
        height="160"
        image={pokemon.image_url}
        title={pokemon.name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/poke.jpeg";
        }}
      />
      <CardContent className="pokemon-card-content">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="pokemon-card-title"
        >
          {pokemon.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="pokemon-card-subtitle"
        >
          Type: {pokemon.type_one} {pokemon.type_two && `/ ${pokemon.type_two}`}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="button-capture"
          onClick={handleCapture}
          disabled={pokemon.captured}
        >
          {pokemon.captured ? "Captured" : "Capture"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default React.memo(PokemonCard);
