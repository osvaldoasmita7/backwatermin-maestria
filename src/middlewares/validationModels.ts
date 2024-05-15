import { Request, Response } from "express";
import { validationResult } from "express-validator";
export const validationModels = (
  req: Request,
  res: Response,
  next: () => {}
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.mapped());
    return res.status(400).json({
      ok: false,
      error: errors.mapped(),
      status: 400,
    });
  }
  next();
};
