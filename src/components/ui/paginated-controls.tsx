"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationControlsProps } from "@/app/types/ui/paginatedControls";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  total,
  rowsPerPage,
  onPageChange,
  isPending,
}) => {
  const totalPages = Math.ceil(total / rowsPerPage);
  if (totalPages <= 1) return null;

  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, total);

  return (
    <div className="flex items-center gap-2">
      <span>
        {start}-{end} of {total.toLocaleString()}
      </span>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isPending}
        className="px-2 py-2 border rounded-3xl disabled:opacity-50 cursor-pointer bg-white"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || isPending}
        className="px-2 py-2 border rounded-3xl disabled:opacity-50 cursor-pointer bg-white"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default React.memo(PaginationControls);
