import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        status: false,
        errors: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        })),
      });
      return;
    }

    req.body = value;
    next();
  };
