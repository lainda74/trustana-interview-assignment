import React from "react";
import DynamicTable from "@/components/ui/dynamic-table";
import { Props } from "@/app/types/ui/paginatedTable.type";

const PaginatedTable = <T extends object>({
  data,
  rowsPerPage,
  page,
  total,
  onPageChange,
}: Props<T>) => {
  const totalPages = total ? Math.ceil(total / rowsPerPage): 0;

  return (
    <div>
      <DynamicTable data={data} />
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default React.memo(PaginatedTable);
