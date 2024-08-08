import React from "react";
import { Pagination } from "@mui/material";
import "../../styles/pokemon.css";
import { PaginationControlsProps } from "../../interfaces/Pokemon";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      color="primary"
      className="pagination-controls"
    />
  );
};

export default PaginationControls;
