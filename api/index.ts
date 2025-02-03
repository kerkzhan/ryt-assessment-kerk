import { KEYS } from "@/constants/db-keys";
import { ERROR_CODES } from "@/constants/error-codes";
import { getData, setData } from "@/db/db";
import { Balance, Contact, InsertTransaction, Transaction } from "@/types/data";
import { ApiError } from "@/types/errors";
import * as Crypto from "expo-crypto";

// Fake delay from 0 - 1000ms to simulate hitting external APIs
const delay = async () => {
  await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 1000)));
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

const makeTransfer = async (data: InsertTransaction) => {
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

  const transaction: Transaction = {
    id: Crypto.randomUUID(),
    amount: data.amount,
    recipient: data.recipient,
    timestamp: new Date().toISOString(),
    note: data.note,
  };

  const newBalance = {
    amount: balance.amount - data.amount,
  };

  const transactionHistory = await getTransactionHistory({});
  transactionHistory.push(transaction);

  const insertHistorySuccess = await setData<Transaction[]>({
    key: KEYS.HISTORY,
    value: transactionHistory,
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

const getTransactionById = async (id: string) => {
  await delay();

  const transactions = await getData<Transaction[]>(KEYS.HISTORY);
  const transactionById = transactions?.find((trx) => trx.id === id);

  if (transactions === null || !transactionById) {
    throw {
      code: ERROR_CODES.GENERIC_ERROR,
      message: "Failed to get transaction. Please try again later or contact support.",
    } as ApiError;
  }
  return transactionById;
};

const getTransactionHistory = async ({ limit = 0 }: { limit?: number }) => {
  await delay();

  const transactions = await getData<Transaction[]>(KEYS.HISTORY);
  if (transactions === null) {
    throw {
      code: ERROR_CODES.GENERIC_ERROR,
      message: "Failed to get transaction history. Please try again later or contact support.",
    } as ApiError;
  }
  return !!limit ? transactions.slice(-limit) : transactions;
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

export { getBalance, makeTransfer, getTransactionHistory, getContacts, getTransactionById };
