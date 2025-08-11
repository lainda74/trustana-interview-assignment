import { ProductQuery } from "@/app/types/query-engine/product";
import { Product, ProductAttribute, ProductListResponse, RawProduct } from "@/app/types/product";
import { request } from "@/app/utils/request";

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

  const result = await request<{ data: RawProduct[]; total?: number }>(url, {
    method: "POST",
    body: query ? JSON.stringify(query) : undefined,
  });

  return {
    data: result.data.map(sanitizeProduct),
    total: result.total || 0,
  };
}
