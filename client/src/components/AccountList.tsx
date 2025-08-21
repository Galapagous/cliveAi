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
import { Account } from "../types";
import { getAccounts, getTransactions } from "../api";
import styles from "./AccountList.module.css";
import { getTableData } from "./data";

export function AccountList() {
  // Basic state management - Consider using more robust state management for larger applications
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewItem, setViewItem] = useState<boolean>(false);
  const [activeTrasaction, setActiveTransaction] = useState<Account | null>(
    null
  );
  const [accountsWithTransactions, setAccountsWithTransactions] = useState<
    null | any
  >(null);

  // Data fetching - Consider implementing retry logic, caching, and better error handling
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    if (!accounts) return;

    const fetchAccounts = async () => {
      try {
        const results = await Promise.all(
          accounts.map(async (account) => {
            const transactions = await getTransactions(account.id);
            return {
              ...account,
              transactions,
            };
          })
        );

        // ⬅️ update state with merged accounts + transactions
        setAccountsWithTransactions(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [accounts]);

  // Basic loading and error states - Consider implementing skeleton loading and error boundaries
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Basic render logic - Consider implementing:
  // - Sorting and filtering
  // - Pagination
  // - Search functionality
  // - More interactive features
  // - Accessibility improvements

  const handleViewTransaction = (id: string) => {
    setViewItem(true);
  };

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
            <button onClick={() => handleViewTransaction(account?.id)}>
              View Transaction
            </button>
          </div>
        ))}
      </div>
      {/* transaction list */}
      <section className={styles.table}>
        <h1>Table</h1>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Type</th>
              <th>Desc</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {getTableData(accountsWithTransactions)?.map(
              (tableData: any, index: number) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{tableData?.accountType}</td>
                  <td>{tableData?.description}</td>
                  <td>{tableData?.amount}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
      {/* new transaction */}
      {viewItem && (
        <div>
          <h1>Trasaction Details</h1>
          <div></div>
        </div>
      )}
    </div>
  );
}
