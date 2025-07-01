export interface ISubscription {
  id?: number;
  user: number;
  planType: string;
  status: string;
  trialEnd?: string;
  renewalDate?: string;
  createdAt?: Date;
}
