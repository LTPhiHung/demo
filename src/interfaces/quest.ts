export interface InputType {
  limit: number;
  page: number;
  keywords: string;
  status?: boolean;
}

export interface Quest {
  id: number;
  title: string;
  point: number;
  status: boolean;
  createdAt: string;
}

export interface DataType {
  key: number;
  id: string;
  title: string;
  point: number;
  status: boolean;
  createdAt: string;
}

export interface Paging {
  maxPerPage: number;
  pageNumber: number;
  totalItem: number;
  totalPage: number;
}
