import express from "express";
import { AccountController } from "../controllers/account.controller"; // <-- plural
import { validate } from "../middleware/validation";
import { transactionSchema } from "../validate/validate";

const router = express.Router();

router.get("/accounts", AccountController.getAll);
router.get("/accounts/:id", AccountController.getById);
router.post(
  "/accounts/:id/transactions",
  validate(transactionSchema),
  AccountController.handleTransaction
);
router.get("/accounts/:id/transactions", AccountController.getTransactions);

export default router;
