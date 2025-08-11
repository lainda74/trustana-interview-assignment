import { ProductQuery, QueryOptions } from "@/app/types/productQuery";

export function buildProductQuery({
  page,
  rowsPerPage,
  attribute,
}: QueryOptions) {
  const offset = (page - 1) * rowsPerPage;
  const baseQuery: ProductQuery = {
    pagination: {
      offset,
      limit: rowsPerPage,
    },
  };

  if (attribute) {
    baseQuery.filter = {
      attributes: {
        [attribute]: { $exists: true },
      },
    };
  }

  return baseQuery;
}
