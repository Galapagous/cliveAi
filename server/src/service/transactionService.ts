import { Database } from "sqlite3";

export class TransactionService {
  constructor(private db: Database) {}

  async getTransactions(
    accountId: string,
    page: number,
    limit: number
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      const query = `
        SELECT * FROM accounts
        WHERE id = ?
        ORDER BY createdAt DESC
        LIMIT ? OFFSET ?
      `;

      this.db.all(query, [accountId, limit, offset], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async countTransactions(accountId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) as count FROM accounts WHERE id = ?`;

      this.db.get(query, [accountId], (err, row: any) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    });
  }
}
