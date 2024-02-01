class ApiResponse {
  success: boolean;
  status: number;
  data?: object;
  error?: {
    message: string;
    details: string | any[];
  };
  constructor(
    success: boolean,
    status: number,
    data?: object,
    error?: { message: string; details: string | any[] }
  ) {
    this.success = success;
    this.status = status;
    if (success) {
      this.data = data;
    } else {
      this.error = error;
    }
  }
}

export default ApiResponse;
