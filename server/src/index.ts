/**
 * Banking Dashboard API Server
 *
 * TECHNICAL ASSESSMENT NOTES:
 * This is a basic implementation with intentional areas for improvement:
 * - Currently uses in-memory SQLite (not persistent)
 * - Basic error handling
 * - No authentication/authorization
 * - No input validation
 * - No rate limiting
 * - No caching
 * - No logging system
 * - No tests
 *
 * Candidates should consider:
 * - Data persistence
 * - Security measures
 * - API documentation
 * - Error handling
 * - Performance optimization
 * - Code organization
 * - Testing strategy
 */

import express from "express";
import cors from "cors";
import accountRoute from "./route/account.route";
// import sqlite3 from "sqlite3";
// import { Database } from "sqlite3";
// import { validateTransaction } from "./validate/validate";

const app = express();
const PORT = 3001;

// Basic middleware setup - Consider additional security middleware
app.use(cors());
app.use(express.json());
app.use("/api", accountRoute);

// Database setup - Currently using in-memory SQLite for simplicity
// Consider: Production database, connection pooling, error handling
// const db: Database = new sqlite3.Database(":memory:", (err) => {
//   if (err) {
//     console.error("Error opening database:", err);
//   } else {
//     console.log("Connected to in-memory SQLite database");
//     initializeDatabase();
//   }
// });

// // Basic database initialization
// // Consider: Migration system, seed data management, error handling
// function initializeDatabase() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS accounts (
//       id TEXT PRIMARY KEY,
//       accountNumber TEXT UNIQUE,
//       accountType TEXT CHECK(accountType IN ('CHECKING', 'SAVINGS')),
//       balance REAL,
//       accountHolder TEXT,
//       createdAt TEXT
//     )
//   `;

//   db.run(createTableQuery, (err) => {
//     if (err) {
//       console.error("Error creating table:", err);
//     } else {
//       console.log("Accounts table created");
//       insertSampleData();
//     }
//   });
// }

// // Sample data insertion
// // Consider: Data validation, error handling, transaction management
// function insertSampleData() {
//   const sampleAccounts = [
//     {
//       id: "1",
//       accountNumber: "1001",
//       accountType: "CHECKING",
//       balance: 5000.0,
//       accountHolder: "John Doe",
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: "2",
//       accountNumber: "1002",
//       accountType: "SAVINGS",
//       balance: 10000.0,
//       accountHolder: "Jane Smith",
//       createdAt: new Date().toISOString(),
//     },
//   ];

//   const insertQuery = `
//     INSERT OR REPLACE INTO accounts (id, accountNumber, accountType, balance, accountHolder, createdAt)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   sampleAccounts.forEach((account) => {
//     db.run(
//       insertQuery,
//       [
//         account.id,
//         account.accountNumber,
//         account.accountType,
//         account.balance,
//         account.accountHolder,
//         account.createdAt,
//       ],
//       (err) => {
//         if (err) {
//           console.error("Error inserting sample data:", err);
//         }
//       }
//     );
//   });
// }

// // Consider: Input validation, authentication, rate limiting, response formatting
// app.get("/api/accounts", (req, res) => {
//   db.all("SELECT * FROM accounts", (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });

// app.get("/api/accounts/:id", (req, res) => {
//   db.get("SELECT * FROM accounts WHERE id = ?", [req.params.id], (err, row) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     if (!row) {
//       res.status(404).json({ error: "Account not found" });
//       return;
//     }
//     res.json(row);
//   });
// });

// // post endpoint
// app.post("/api/accounts/:id/transactions", async (req, res) => {
//   const { type, amount, targetAccountId } = req.body;
//   const accountId = req.params.id;
//   // check account exists
//   db.get(
//     "SELECT * FROM accounts WHERE id = ?",
//     [accountId],
//     (err, account: any) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (!account) return res.status(404).json({ error: "Account not found" });

//       // balance checks
//       if (
//         (type === "WITHDRAWAL" || type === "TRANSFER") &&
//         account.balance < amount
//       ) {
//         return res.status(400).json({ error: "Insufficient balance" });
//       }

//       // handle DEPOSIT
//       if (type === "DEPOSIT") {
//         const newBalance = account.balance + amount;
//         db.run(
//           "UPDATE accounts SET balance = ? WHERE id = ?",
//           [newBalance, accountId],
//           function (err) {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({
//               status: true,
//               balance: newBalance,
//               message: "Deposit successful",
//             });
//           }
//         );
//       }

//       // handle WITHDRAWAL
//       if (type === "WITHDRAWAL") {
//         const newBalance = account.balance - amount;
//         db.run(
//           "UPDATE accounts SET balance = ? WHERE id = ?",
//           [newBalance, accountId],
//           function (err) {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({
//               status: true,
//               balance: newBalance,
//               message: "Withdrawal successful",
//             });
//           }
//         );
//       }

//       // handle TRANSFER
//       if (type === "TRANSFER") {
//         if (!targetAccountId) {
//           return res
//             .status(400)
//             .json({ error: "Target account required for transfer" });
//         }

//         db.get(
//           "SELECT * FROM accounts WHERE id = ?",
//           [targetAccountId],
//           (err, targetAccount: any) => {
//             if (err) return res.status(500).json({ error: err.message });
//             if (!targetAccount)
//               return res
//                 .status(404)
//                 .json({ error: "Target account not found" });

//             // withdraw from sender
//             const newSenderBalance = account.balance - amount;
//             const newTargetBalance = targetAccount.balance + amount;

//             db.serialize(() => {
//               db.run("UPDATE accounts SET balance = ? WHERE id = ?", [
//                 newSenderBalance,
//                 accountId,
//               ]);
//               db.run("UPDATE accounts SET balance = ? WHERE id = ?", [
//                 newTargetBalance,
//                 targetAccountId,
//               ]);
//             });

//             res.json({ status: true, message: "Transfer successful" });
//           }
//         );
//       }
//     }
//   );
// });
// Server startup
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
