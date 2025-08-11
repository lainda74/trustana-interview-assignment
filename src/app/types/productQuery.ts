export interface QueryOptions {
  page: number;
  rowsPerPage: number;
  attribute?: string;
}

export interface ProductQuery {
  pagination: {
    offset: number;
    limit: number;
  };
  filter?: {
    attributes: {
      [key: string]: { $exists: boolean };
    };
  };
}