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


export interface Evidence {
  fileName: string;
  fileUrl: string;
  mimeType: string;
}

export interface RequestDetail {
  id: number;
  code: string;
  challengeCode: string;
  challengeType: number;
  title: string;
  rejectedReason: string | null;
  point: number;
  status: number;
  email: string;
  fullName: string;
  evidence: Evidence[];
  relatedLink: string;
  submittedDate: string;
  updatedAt: string;
  updatedBy: string;
  platform: number; 
  description: string;
}
