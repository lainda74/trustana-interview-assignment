import { Suspense } from "react";
import { fetchProducts } from "@/app/services/productService";
import DashboardView from "./components/DashboardView";
import { getColumnConfig, processDataForView } from "./utils/table.utils";
import { buildProductQuery } from "@/app/lib/queryBuilders";
import { ROWS_PER_PAGE } from "./config/table.config";
import ErrorBoundary from "@/components/common/error-boundary";
import { DashboardSearchParams } from "./types/types";

export default async function Dashboard({
  searchParams: asyncSearchParams,
}: {
  searchParams?: Promise<DashboardSearchParams>;
}) {
  const searchParams = await asyncSearchParams;
  const page = Number(searchParams?.page ?? "1");
  const attribute = searchParams?.attribute;
  const columns = getColumnConfig(
    searchParams?.columns !== undefined
      ? { columns: searchParams.columns }
      : undefined
  );

  const query = buildProductQuery({
    page,
    rowsPerPage: ROWS_PER_PAGE,
    attribute,
  });

  const { data: products, total } = await fetchProducts(query);

  const processedData = processDataForView(products, columns);

  return (
    <Suspense fallback={<div className="p-8 text-center">Loading View...</div>}>
      <ErrorBoundary fallback={<p>Could not load widget</p>}>
        <DashboardView
          products={processedData}
          total={total}
          columns={columns}
          page={page}
        />
      </ErrorBoundary>
    </Suspense>
  );
}
