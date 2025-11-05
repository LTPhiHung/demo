export interface WelcomeQuest {
  id: number;
  challengeCode: string;
  title: string;
  description: string;
  status: boolean;
  platform: number; 
  requiredUploadEvidence: boolean;
  requiredEnterLink: boolean;
  createdAt: string;
  expiryDate: string | null; 
}
