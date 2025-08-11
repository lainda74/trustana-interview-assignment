import { Product } from '@/app/types/product';
import { ColumnConfig } from '@/app/types/ui/table';
import { DEFAULT_COLUMNS } from '../config/table.config';
import { DashboardSearchParams } from '../types/types';

/**
 * Determines the visibility of table columns based on the 'columns' URL search parameter.
 * If the parameter is not present, it returns the default column configuration.
 * Otherwise, it updates the visibility of each column based on the keys provided
 * in the comma-separated URL parameter.
 */
export function getColumnConfig(searchParams?: Pick<DashboardSearchParams, 'columns'>): ColumnConfig[] {
  const columnsParam = searchParams?.columns;
  if (columnsParam === undefined) return DEFAULT_COLUMNS;

  const visibleKeysFromUrl = columnsParam ? columnsParam.split(',') : [];
  const visibleSet = new Set(visibleKeysFromUrl);
  return DEFAULT_COLUMNS.map(col => ({
    ...col,
    visible: visibleSet.has(col.key),
  }));
}

/**
 * Filters an array of product objects to include only the properties
 * corresponding to the currently visible columns. This is used to prepare
 * data for the dynamic table view.
 */
export function processDataForView(products: Product[], columns: ColumnConfig[]): Partial<Product>[] {
  const visibleColumnKeys = columns.filter(c => c.visible).map(c => c.key);
  return products.map(product => {
    const newProduct: Record<string, unknown> = {};
    for (const key of visibleColumnKeys) {
      if (Object.prototype.hasOwnProperty.call(product, key)) {
        newProduct[key] = product[key as keyof Product];
      }
    }
    return newProduct;
  });
}
