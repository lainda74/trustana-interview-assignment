import { ColumnConfig } from '@/app/types/ui/table';

export const ROWS_PER_PAGE = 100;

export const DEFAULT_COLUMNS: ColumnConfig[] = [
  { key: 'id', label: 'Product ID', visible: true, width: '20%' },
  { key: 'skuId', label: 'SKU', visible: true, width: '10%' },
  { key: 'attributes', label: 'Attribute Values', visible: true, width: '40%' },
  { key: 'createdAt', label: 'Created At', visible: true, width: '15%' },
  { key: 'updatedAt', label: 'Updated At', visible: true, width: '15%' },
];
