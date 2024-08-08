// src/interfaces/Pokemon.ts
export interface Pokemon {
  number: number;
  name: string;
  type_one: string;
  type_two?: string;
  image_url: string;
  captured: boolean;
}

export interface PokemonApiResponse {
  data: Pokemon[];
  total_pages: number;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
  setCaptureMessage: (message: string | null) => void;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
