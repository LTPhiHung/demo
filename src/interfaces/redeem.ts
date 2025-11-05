export interface Redeem {
  id: number;
  redeemCode: string;
  point: number;
  isPercentage: number; 
  percentageOff: number;
  maximumAmount: number;
  fixAmount: number | null;
  allowedQuantities: number;
  validityPeriod: string | null; 
  accountRank: number[];
  status: number;
  publicToUser: number; 
  redeemQuantities: number;
}
