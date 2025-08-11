import { ProductQuery } from "@/app/types/query-engine/product";
import { Product, ProductAttribute, ProductListResponse, RawProduct } from "@/app/types/product";
import * as Sentry from "@sentry/nextjs";

function sanitizeProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    skuId: raw.skuId,
    updatedAt: raw.updatedAt,
    createdAt: raw.createdAt,
    attributes: raw.attributes as ProductAttribute[],
  };
}

export async function fetchProducts(query?: ProductQuery): Promise<ProductListResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = `${baseUrl}/api/products`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: query ? JSON.stringify(query) : null,
  });

  if (!res.ok) {
    Sentry.captureException(new Error("Failed to fetch products"));
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  const sanitizedData = (result.data as RawProduct[]).map(sanitizeProduct);

  return {
    data: sanitizedData,
    total: result.total || 0,
  };
}
