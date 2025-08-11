import React from "react";
import { ColumnConfig } from '@/app/types/ui/table';

type Props<T extends object> = {
  data: T[];
  columns?: ColumnConfig[];
  isPending?: boolean;
  rowsPerPage?: number;
};

const formatValue = (
  value: string | number | object | string[] | unknown,
  key?: string
): string => {
  if (
    (key === "createdAt" || key === "updatedAt") &&
    typeof value === "number"
  ) {
    return new Date(value).toISOString().split("T")[0];
  }

  if (key === "attributes" && Array.isArray(value)) {
    const nameAttr = value.find((attr) => attr.key === "name");
    return nameAttr?.value || "";
  }

  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v)))
      .join(", ");
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }

  return String(value);
};

const DynamicTable = <T extends object>({
  data,
  columns,
  isPending,
  rowsPerPage = 10,
}: Props<T>) => {
  if (!isPending && (!data || data.length === 0))
    return <p className="text-center p-8">No data available</p>;

  const visibleColumns = columns?.filter((c) => c?.visible) ?? [];

  const fallbackPercent = Math.floor(100 / Math.max(visibleColumns.length, 1));

  const computedWidths = visibleColumns.map((col) =>
    col?.width ? col.width : `${fallbackPercent}%`
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full table-fixed box-border bg-white">
        <colgroup>
          {visibleColumns.map((col, idx) => (
            <col
              key={String(col.key)}
              style={{
                width: computedWidths[idx],
                minWidth: computedWidths[idx],
                maxWidth: computedWidths[idx],
              }}
            />
          ))}
        </colgroup>

        <thead className="bg-gray-100">
          <tr>
            {visibleColumns.map((col, idx) => (
              <th
                key={String(col.key)}
                className="text-left px-4 py-4 border-b border-gray-200 text-md capitalize box-border"
                style={{
                  width: computedWidths[idx],
                  minWidth: computedWidths[idx],
                }}
              >
                <div className="truncate overflow-hidden whitespace-nowrap w-full">
                  {col.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isPending
            ? Array.from({ length: rowsPerPage }).map((_, rowIndex) => (
                <tr key={rowIndex} className="h-10">
                  {visibleColumns?.map((col, idx) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-4 border-b border-gray-200 box-border"
                      style={{
                        width: computedWidths[idx],
                        minWidth: computedWidths[idx],
                      }}
                    >
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 h-10">
                  {visibleColumns?.map((col, idx) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-4 border-b border-gray-200 text-md text-gray-600 box-border"
                      style={{
                        width: computedWidths[idx],
                        minWidth: computedWidths[idx],
                      }}
                    >
                      <div className="truncate overflow-hidden whitespace-nowrap w-full">
                        {formatValue(row[col.key as keyof T], String(col.key))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(DynamicTable) as typeof DynamicTable;
