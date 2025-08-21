import { Request, Response } from "express";
import { AccountService } from "../service/accountService";
import { TransactionService } from "../service/transactionService";
import { db } from "../database/db";

const transactionService = new TransactionService(db);

export const AccountController = {
  async getAll(req: Request, res: Response) {
    try {
      const accounts = await AccountService.getAllAccounts();
      res.json(accounts);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const account = await AccountService.getAccountById(req.params.id);
      if (!account) {
        res.status(404).json({ error: "Account not found" });
        return;
      }
      res.json(account); // ✅ don’t return
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async handleTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { type, amount, targetAccountId } = req.body;
      const accountId = req.params.id;

      const account: any = await AccountService.getAccountById(accountId);
      if (!account) {
        res.status(404).json({ error: "Account not found" });
        return;
      }

      if (
        (type === "WITHDRAWAL" || type === "TRANSFER") &&
        account.balance < amount
      ) {
        res.status(400).json({ error: "Insufficient balance" });
        return;
      }

      if (type === "DEPOSIT") {
        const newBalance = account.balance + amount;
        await AccountService.updateBalance(accountId, newBalance);
        res.json({
          status: true,
          balance: newBalance,
          message: "Deposit successful",
        });
        return;
      }

      if (type === "WITHDRAWAL") {
        const newBalance = account.balance - amount;
        await AccountService.updateBalance(accountId, newBalance);
        res.json({
          status: true,
          balance: newBalance,
          message: "Withdrawal successful",
        });
        return;
      }

      if (type === "TRANSFER") {
        if (!targetAccountId) {
          res
            .status(400)
            .json({ error: "Target account required for transfer" });
          return;
        }

        const targetAccount: any = await AccountService.getAccountById(
          targetAccountId
        );
        if (!targetAccount) {
          res.status(404).json({ error: "Target account not found" });
          return;
        }

        const newSenderBalance = account.balance - amount;
        const newTargetBalance = targetAccount.balance + amount;

        await AccountService.updateBalance(accountId, newSenderBalance);
        await AccountService.updateBalance(targetAccountId, newTargetBalance);

        res.json({ status: true, message: "Transfer successful" });
        return;
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const transactions = await transactionService.getTransactions(
        id,
        page,
        limit
      );
      const total = await transactionService.countTransactions(id);

      res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: transactions,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
