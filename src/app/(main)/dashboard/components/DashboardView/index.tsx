"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useTransition } from "react";
import MenuButton from "@/components/ui/menu-button";
import DynamicTable from "@/components/ui/dynamic-table";
import PaginationControls from "@/components/ui/paginated-controls";
import { Product } from "@/app/types/product";
import { ROWS_PER_PAGE } from "../../config/table.config";
import { Option } from "@/app/types/ui/dropdown.type";
import AttributeFilter from "../AttributeFilter";
import ErrorBoundary from "@/components/common/error-boundary";
import { ColumnConfig } from '@/app/types/ui/table';

interface DashboardViewProps {
  products: Partial<Product>[];
  total: number;
  columns: ColumnConfig[];
  page: number;
}

export default function DashboardView({
  products,
  total,
  columns: initialColumns,
  page,
}: DashboardViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [columns, setColumns] = useState<ColumnConfig[]>(initialColumns);

  const handleColumnsChange = useCallback(
    (newColumns: ColumnConfig[]) => {
      setColumns(newColumns);

      const visibleKeys = newColumns.filter((c) => c.visible).map((c) => c.key);
      const params = new URLSearchParams(searchParams.toString());
      params.set("columns", visibleKeys.join(","));

      const newUrl = `${pathname}?${params.toString()}`;

      const shouldRefetch = visibleKeys.some(
        (key) =>
          products.length > 0 &&
          !Object.prototype.hasOwnProperty.call(products[0], key)
      );

      if (shouldRefetch) {
        startTransition(() => {
          router.push(newUrl);
        });
      } else {
        window.history.replaceState(null, "", newUrl);
      }
    },
    [products, pathname, router, searchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("page", String(newPage));
      const search = current.toString();
      const query = search ? `?${search}` : "";
      startTransition(() => {
        router.push(`${pathname}${query}`);
      });
    },
    [router, pathname, searchParams]
  );

  const handleAttributeChange = useCallback(
    (option: Option) => {
      const current = new URLSearchParams(searchParams);

      if (option.value) {
        current.set("attribute", option.value);
      } else {
        current.delete("attribute");
      }
      current.delete("page");

      const search = current.toString();
      const query = search ? `?${search}` : "";

      startTransition(() => {
        router.push(`${pathname}${query}`);
      });
    },
    [pathname, router, searchParams]
  );

  return (
    <>
      <div className="sticky top-0 z-10 bg-white flex flex-wrap justify-between w-full gap-4 items-center px-8 pt-4 border-b border-gray-200">
        <div className="flex-1 min-w-[250px] mb-4">
          <ErrorBoundary
            fallback={
              <div className="text-red-500 p-2 rounded-md bg-red-50">
                Failed to load attribute filters.
              </div>
            }
          >
            <AttributeFilter onAttributeChange={handleAttributeChange} />
          </ErrorBoundary>
        </div>
        <div className="flex-1 min-w-[250px]">
          <ErrorBoundary
            fallback={
              <div className="text-red-500 p-2 rounded-md bg-red-50">
                Failed to load column manager.
              </div>
            }
          >
            <MenuButton
              title="Manage Columns"
              columns={columns}
              onColumnsChange={handleColumnsChange}
            />
          </ErrorBoundary>
        </div>
        <div className="mb-4">
          <ErrorBoundary
            fallback={
              <div className="text-red-500 p-2 rounded-md bg-red-50">
                Failed to load pagination.
              </div>
            }
          >
            <PaginationControls
              page={page}
              total={total}
              rowsPerPage={ROWS_PER_PAGE}
              onPageChange={handlePageChange}
              isPending={isPending}
            />
          </ErrorBoundary>
        </div>
      </div>
      <div className="p-8">
        <ErrorBoundary
          fallback={
            <div className="text-red-500 p-2 rounded-md bg-red-50">
              Failed to load the products list.
            </div>
          }
        >
          <DynamicTable
            data={products}
            columns={columns}
            isPending={isPending}
            rowsPerPage={ROWS_PER_PAGE}
          />
        </ErrorBoundary>
      </div>
    </>
  );
}
