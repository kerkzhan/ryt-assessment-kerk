// Types
export type Transaction = {
  id: string;
  amount: number;
  recipient: Contact;
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

export type InsertTransaction = Omit<Transaction, "id" | "timestamp">;
