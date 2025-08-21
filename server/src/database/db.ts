import sqlite3, { Database } from "sqlite3";

export const db: Database = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to in-memory SQLite database");
    initializeDatabase();
  }
});

function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      accountNumber TEXT UNIQUE,
      accountType TEXT CHECK(accountType IN ('CHECKING', 'SAVINGS')),
      balance REAL,
      accountHolder TEXT,
      createdAt TEXT
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) console.error("Error creating table:", err);
    else insertSampleData();
  });
}

function insertSampleData() {
  const sampleAccounts = [
    {
      id: "1",
      accountNumber: "1001",
      accountType: "CHECKING",
      balance: 5000.0,
      accountHolder: "John Doe",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      accountNumber: "1002",
      accountType: "SAVINGS",
      balance: 10000.0,
      accountHolder: "Jane Smith",
      createdAt: new Date().toISOString(),
    },
  ];

  const insertQuery = `
    INSERT OR REPLACE INTO accounts (id, accountNumber, accountType, balance, accountHolder, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  sampleAccounts.forEach((account) => {
    db.run(insertQuery, [
      account.id,
      account.accountNumber,
      account.accountType,
      account.balance,
      account.accountHolder,
      account.createdAt,
    ]);
  });
}
