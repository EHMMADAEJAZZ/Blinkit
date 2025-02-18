export class ApiResponse {
  constructor(statusCode, message = 'OK', data = []) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
