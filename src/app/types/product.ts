/**
 * Fixed types
 * If you need to modify these, please state your reasons in the SUBMISSION.md file.
 */

export type ProductAttributeValue = string | object | string[] | number | null;

export type TypedProducts = {
  products: Product[];
};

export interface ProductAttribute {
  key: string;
  value: ProductAttributeValue;
}

export interface Product {
  id: string;
  skuId: string;
  updatedAt: number;
  createdAt: number;
  attributes: ProductAttribute[];
}

export type RawProduct = Product & {
  tags?: string[];
  dataEnrichment?: object;
};

export type ProductListResponse = {
  data: Product[];
  total: number;
};
