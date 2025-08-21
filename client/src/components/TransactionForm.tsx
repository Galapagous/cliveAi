import { useState } from "react";

type Props = {
  onSubmit: (type: string, amount: number, description: string) => void;
  error?: string | null;
};

export function TransactionForm({ onSubmit, error }: Props) {
  const [type, setType] = useState("DEPOSIT");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (amount <= 0) return;
    onSubmit(type, amount, description);
    setAmount(0);
    setDescription("");
  };

  return (
    <div>
      <h4>New Transaction</h4>
      {error && <p className="error">{error}</p>}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="DEPOSIT">Deposit</option>
        <option value="WITHDRAWAL">Withdrawal</option>
        <option value="TRANSFER">Transfer</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
