export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Later in your code:
try {
  // ...
} catch (error) {
  if (error instanceof HttpError) {
    console.log(error.status); // TypeScript now knows 'status' exists
  }
}
