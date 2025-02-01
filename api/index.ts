const FAKE_DELAY = 800;

const delay = async () => {
  await new Promise((r) => setTimeout(r, FAKE_DELAY));
};

export const api = {
  getBalance: async () => {
    await delay();
    return {
      balance: 8350.0,
      currency: "USD",
      savedAmount: 240,
    };
  },

  makeTransfer: async (data: TransferRequest) => {
    await delay();
    // Simulate validation
    if (data.amount > 8350) {
      throw new Error("Insufficient funds");
    }

    return {
      success: true,
      transactionId: Math.random().toString(36).slice(2),
      timestamp: new Date().toISOString(),
    };
  },

  getRecentTransactions: async () => {
    await delay();
    return [
      { id: "1", amount: 50, recipient: "John Doe", date: "2024-02-01" },
      { id: "2", amount: 30, recipient: "Jane Smith", date: "2024-02-02" },
    ];
  },
};

// Types
interface TransferRequest {
  amount: number;
  recipientId: string;
  note?: string;
}
