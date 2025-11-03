import type dayjs from "dayjs";
export interface InputType {
  limit: number;
  page: number;
  keywords: string;
  status?: boolean;
}

export interface Quest {
  challengeCode: string;
  id: string;
  title: string;
  point: number;
  status: boolean;
  allowSubmitMultiple: boolean;
  accountRanks: string[];
  description: string;
  requiredUploadEvidence: boolean;
  requiredEnterLink: boolean;
  expiryDate: dayjs.Dayjs | null;
  platform: number;
  createdAt: string;               
  updatedAt: string;               
  createdBy: string;
  updatedBy: string | null;
}

export interface Paging {
  maxPerPage: number;
  pageNumber: number;
  totalItem: number;
  totalPage: number;
}
