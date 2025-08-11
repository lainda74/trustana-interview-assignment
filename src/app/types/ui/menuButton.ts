import { ColumnConfig } from '@/app/types/ui/table';

export interface MenuButtonProps {
  title: string;
  columns: ColumnConfig[];
  onColumnsChange: (newColumns: ColumnConfig[]) => void;
}