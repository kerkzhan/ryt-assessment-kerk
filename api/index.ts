import { KEYS } from "@/constants/db-keys";
import { ERROR_CODES } from "@/constants/error-codes";
import { getData, setData } from "@/db/db";
import { Balance, Contact, TransferRequest } from "@/types/data";
import { ApiError } from "@/types/errors";
import * as Crypto from "expo-crypto";

const FAKE_DELAY = 2000;

const delay = async () => {
  await new Promise((r) => setTimeout(r, FAKE_DELAY));
};

const getBalance = async (): Promise<Balance> => {
  await delay();
  const balance = await getData<Balance>(KEYS.BALANCE);
  if (!balance) {
    throw {
      code: ERROR_CODES.GENERIC_ERROR,
      message: "Failed to get balance. Please try again later or contact support.",
    } as ApiError;
  }
  return {
    amount: balance.amount,
  };
};

const makeTransfer = async (data: TransferRequest) => {
  await delay();

  const balance = await getBalance();

  // TODO: Validate input with zod

  if (data.amount > balance.amount) {
    throw {
      code: ERROR_CODES.INSUFFICIENT_FUNDS,
      message: "Insufficient funds. Please input a number lower than total balance.",
    } as ApiError;
  }

  // TODO: Implement biometric auth check for

  const transaction: TransferRequest = {
    id: Crypto.randomUUID(),
    amount: data.amount,
    recipientId: data.recipientId,
    timestamp: new Date().toISOString(),
  };

  const newBalance = {
    amount: balance.amount - data.amount,
  };

  const insertHistorySuccess = await setData<TransferRequest>({
    key: KEYS.HISTORY,
    value: transaction,
  });

  const updateBalanceSuccess = await setData<Balance>({ key: KEYS.BALANCE, value: newBalance });

  if (!insertHistorySuccess || !updateBalanceSuccess) {
    throw {
      code: ERROR_CODES.NETWORK_ERROR,
      message: "Something went wrong. Please try again later.",
    } as ApiError;
  }

  return {
    success: true,
    transactionId: transaction.id,
    timestamp: transaction.timestamp,
  };
};

const getRecentTransactions = async () => {
  await delay();
  return [
    { id: "1", amount: 50, recipient: "John Doe", date: "2024-02-01" },
    { id: "2", amount: 30, recipient: "Jane Smith", date: "2024-02-02" },
  ];
};

const getContacts = async (): Promise<Contact[]> => {
  await delay();

  const contacts = await getData<Contact[]>(KEYS.CONTACTS);

  if (contacts === null) {
    throw {
      code: ERROR_CODES.GENERIC_ERROR,
      message: "Failed to get contacts. Please try again later or contact support.",
    } as ApiError;
  }

  return contacts;
};

export { getBalance, makeTransfer, getRecentTransactions, getContacts };
