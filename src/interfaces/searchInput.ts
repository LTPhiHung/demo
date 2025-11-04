export interface InputType {
  limit: number;
  page: number;
  keywords?: string;
  status?: number | boolean;
  questType?: number;
   submittedDate?: {
    from: string; 
    to: string;
  };
}

export interface SearchInput {
  keywords?: string;
  status?: number;
  questType?: number;
   submittedDate?: {
    from: string; 
    to: string;
  };
}

export interface PaginationInput {
  limit: number;
  page: number;
}

