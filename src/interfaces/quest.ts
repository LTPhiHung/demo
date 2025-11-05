import type dayjs from "dayjs";
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


