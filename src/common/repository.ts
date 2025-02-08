import { DeepPartial, ObjectLiteral } from 'typeorm';

export abstract class Repository<T extends ObjectLiteral> {
  abstract create(payload: DeepPartial<T>): Promise<T>;
  abstract get(filter: Partial<T>): Promise<T | null>;
  abstract update(id: number, payload: DeepPartial<T>): Promise<T | null>;
}
