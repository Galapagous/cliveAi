/**
 * AccountList Component
 *
 * TECHNICAL ASSESSMENT NOTES:
 * This is a basic implementation with intentional areas for improvement:
 * - Basic error handling
 * - Simple loading state
 * - No skeleton loading
 * - No retry mechanism
 * - No pagination
 * - No sorting/filtering
 * - No animations
 * - No accessibility features
 * - No tests
 *
 * Candidates should consider:
 * - Component structure
 * - Error boundary implementation
 * - Loading states and animations
 * - User feedback
 * - Performance optimization
 * - Accessibility (ARIA labels, keyboard navigation)
 * - Testing strategy
 */

import { useState, useEffect } from "react";
import { Account, Transaction } from "../types";
import { getAccounts, getTransactions } from "../api";
import styles from "./AccountList.module.css";

export function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<
    Record<string, Transaction[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);

        // Fetch transactions for each account
        const txs: Record<string, Transaction[]> = {};
        for (const account of data) {
          try {
            txs[account.id] = await getTransactions(account.id);
          } catch {
            txs[account.id] = [];
          }
        }
        setTransactions(txs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2>Accounts</h2>
      <div className={styles.grid}>
        {accounts.map((account) => (
          <div key={account.id} className={styles.card}>
            <h3>{account.accountHolder}</h3>
            <p>Account Number: {account.accountNumber}</p>
            <p>Type: {account.accountType}</p>
            <p>Balance: ${account.balance.toFixed(2)}</p>

            <h4>Recent Transactions</h4>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {(transactions[account.id] || []).map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.date).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={
                          tx.type === "DEPOSIT"
                            ? styles.deposit
                            : tx.type === "WITHDRAWAL"
                            ? styles.withdrawal
                            : styles.transfer
                        }
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td>{tx.description}</td>
                    <td
                      style={{
                        color:
                          tx.type === "WITHDRAWAL" || tx.type === "TRANSFER"
                            ? "red"
                            : "green",
                      }}
                    >
                      {tx.type === "WITHDRAWAL" || tx.type === "TRANSFER"
                        ? `- $${tx.amount}`
                        : `+ $${tx.amount}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
