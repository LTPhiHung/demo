export interface Evidence {
  fileName: string;
  fileUrl: string;
  mimeType: string;
}

export interface QuestRequest {
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
