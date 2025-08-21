import { Transaction } from "../types";

type Props = {
  transactions: Transaction[];
  page: number;
  onPageChange: (page: number) => void;
  filterType: string;
  onFilterChange: (filter: string) => void;
  sortBy: "date" | "amount";
  onSortChange: (sort: "date" | "amount") => void;
};

export function TransactionList({
  transactions,
  page,
  onPageChange,
  filterType,
  onFilterChange,
  sortBy,
  onSortChange,
}: Props) {
  return (
    <div>
      <h3>Transactions</h3>

      {/* Filters */}
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="DEPOSIT">Deposit</option>
          <option value="WITHDRAWAL">Withdrawal</option>
          <option value="TRANSFER">Transfer</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as "date" | "amount")}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.type}</td>
              <td>{t.description}</td>
              <td>${t.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => onPageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
}
