import { check, checkSchema } from "express-validator";

const loginRule: any = [
  check("id", "Opcional").not().isInt().optional(),
  checkSchema({
    username: { isString: true },
    password: { isString: true },
    type_id: { isNumeric: true },
    active: { isBoolean: true },
  }),
];
export { loginRule };
