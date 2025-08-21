import { axiosAuth } from "./axios/axios";
import { TRANSACTIONS_URL } from "./endpoint";
import { Account } from "./types";

const API_URL = "http://localhost:3001/api";

export const getAccounts = async (): Promise<Account[]> => {
  const response = await fetch(`${API_URL}/accounts`);
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};

export const getAccount = async (id: string): Promise<Account> => {
  const response = await fetch(`${API_URL}/accounts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch account");
  }
  return response.json();
};

export const getTransactions = async (id: string): Promise<Account> => {
  const response = await axiosAuth.get(
    TRANSACTIONS_URL + `/accounts/${id}/transactions`
  );
  if (!response.status) {
    throw new Error("Failed to fetch account");
  }
  return response.data;
};

export const createTransaction = async (payload: any): Promise<Account> => {
  const response = await axiosAuth.post(TRANSACTIONS_URL, payload);
  if (!response) {
    throw new Error("Failed to perform transaction");
  }
  return response.data;
};
