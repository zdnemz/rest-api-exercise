import { NextFunction } from "express";
import Joi from "joi";
import error from "../res/error";

interface ValidateFunction {
  (schema: Joi.ObjectSchema, request: object, next: NextFunction): Promise<any>;
}

const validate: ValidateFunction = async (schema, request, next) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    next(
      error(400, { message: "Validation error", details: result.error.message })
    );
    return;
  }

  return result.value;
};

export default validate;
