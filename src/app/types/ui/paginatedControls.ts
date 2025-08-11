export interface PaginationControlsProps {
  page: number;
  total: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  isPending?: boolean;
}