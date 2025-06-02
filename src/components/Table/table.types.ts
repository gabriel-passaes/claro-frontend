export type TableColumn<T> = {
  header: string;
  field?: keyof T;
  body?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
};

export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  zebra?: boolean;
  actions?: (row: T) => React.ReactNode[];
  currentPage: number;
  onPageChange: (page: number) => void;
  rowsPerPage?: number;
};
