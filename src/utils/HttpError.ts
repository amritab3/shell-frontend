export default class HttpError extends Error {
  status: number;
  statusText?: string;
  constructor(
    message: string,
    status: number,
    statusText?: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.status = status;
    this.statusText = statusText;
  }
}
