import { db } from "../database/db";

export const confirmBalance = (userBalance: number, amount: number) => {
  return userBalance > amount ? true : false;
};

export const AccountService = {
  getAllAccounts(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM accounts", (err: any, rows: any) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getAccountById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM accounts WHERE id = ?",
        [id],
        (err: any, row: any) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  },

  updateBalance(id: string, balance: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE accounts SET balance = ? WHERE id = ?",
        [balance, id],
        (err: any) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};
