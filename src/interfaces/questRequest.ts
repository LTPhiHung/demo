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

export interface Paging {
  maxPerPage: number;
  pageNumber: number;
  totalItem: number;
  totalPage: number;
}


export interface QuestRequest {
  id: number;
  code: string;
  title: string;
  email: string;
  fullName: string;
  point: number;
  status: number; 
  challengeType: number; 
  submittedDate: string;
}
