// Types
export type TransferRequest = {
  id: string;
  amount: number;
  recipientId: string;
  timestamp: string;
  note?: string;
};

export type Balance = {
  amount: number;
};

export type Contact = {
  id: string;
  name: string;
};
