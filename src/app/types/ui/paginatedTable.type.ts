export type Props<T> = {
  data: T[];
  rowsPerPage: number;
  page: number;
  total: number | null;
  onPageChange: (page: number) => void;
};
