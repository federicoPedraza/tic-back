export abstract class Repository<T> {
  abstract create(payload: Partial<T>): Promise<T>;
  abstract get(filter: Partial<T>): Promise<T | null>;
}
