import { DeepPartial, ObjectLiteral, FindOptionsWhere, Repository as TypeORMRepository } from 'typeorm';
import { Repository } from './repository';

export abstract class BaseRepository<T extends ObjectLiteral> implements Repository<T> {
  constructor(protected readonly repository: TypeORMRepository<T>) {}

   async create(payload: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(payload);
    return this.repository.save(entity);
  }

  async get(filter: Partial<T>): Promise<T | null> {
    return this.repository.findOne({ where: filter as FindOptionsWhere<T> });
  }

  async update(id: number, payload: DeepPartial<T>): Promise<T | null> {
    const entity = await this.repository.preload({
      id,
      ...payload,
    });
    if (!entity) return null;
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.get({ id } as unknown as Partial<T>);
    if (!entity) return false;

    await this.repository.remove(entity);
    return true;
  }
}
