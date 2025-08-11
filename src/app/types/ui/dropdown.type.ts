export type Option = {
  label: string;
  value: string;
};

export type DropdownFilterProps = {
  options: Option[];
  type?: string | null;
  label?: string;
  value: string;
  total?: number;
  onChange: ({ label, value }: Option) => void;
  onLoadMore?: () => Promise<void>;
  onSearchChange: (value: string) => void;
};