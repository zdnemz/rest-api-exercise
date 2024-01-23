import ResponseError from "../error/error";
import { Request } from "express";
import { Schema } from "joi";

interface ValidateFunction {
  (schema: Schema, request: Request): Promise<any>;
}

const validate: ValidateFunction = async (
  schema: Schema,
  request: Request
) => {
  const result = schema.validate(request.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    throw new ResponseError(400, result.error.message);
  }

  return result.value;
};

export default validate