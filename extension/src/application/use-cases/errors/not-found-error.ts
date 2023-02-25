export class NotFoundError extends Error {
  constructor(field: string) {
    super(`${field} was not found`);
  }
}
