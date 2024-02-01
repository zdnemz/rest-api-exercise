import { Response } from "express";
import ApiResponse from "../utils/apiResponse";

export default function error(
  status: number = 500,
  error: {
    message: string;
    details: string | any[];
  } = {
    message: "Internal server error",
    details:
      "The server encountered an internal error and could not complete your request. Please try again.",
  }
) {
  return new ApiResponse(false, status, null, error);
}
