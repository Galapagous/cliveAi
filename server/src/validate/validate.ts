import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const transactionSchema = Joi.object({
  type: Joi.string().valid("DEPOSIT", "WITHDRAWAL", "TRANSFER").required(),
  amount: Joi.number()
    .positive()
    .required()
    .messages({ "number.positive": "Amount must be greater than 0" }),
  description: Joi.string().required(),
  //   targetAccountId: Joi.string().when("type", {
  //     is: "TRANSFER",
  //     then: Joi.required(),
  //     otherwise: Joi.optional(),
  //   }),
});
