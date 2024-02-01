import ApiResponse from "../utils/apiResponse";

export default function success(status: number, data: object) {
  return new ApiResponse(true, status, data);
}
