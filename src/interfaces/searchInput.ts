export interface InputType {
  limit: number;
  page: number;
  keywords: string;
  status?: boolean;
  questType: number;
   submittedDate?: {
    from: string; 
    to: string;
  };
}
