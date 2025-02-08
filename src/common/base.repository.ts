import { DeepPartial, ObjectLiteral, FindOptionsWhere, Repository as TypeORMRepository, FindManyOptions } from 'typeorm';
import { Repository } from './repository';
import { Pagination } from './pagination';

export abstract class BaseRepository<T extends ObjectLiteral> implements Repository<T> {
  constructor(protected readonly repository: TypeORMRepository<T>) {}

   async create(payload: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(payload);
    return this.repository.save(entity);
  }

  async get(filter: Partial<T>): Promise<T | null> {
    return this.repository.findOne({ where: filter as FindOptionsWhere<T> });
  }

  async getAll<G>(filter: Partial<T>, pagination?: Pagination<G>): Promise<Pagination<G>> {
    let page = 1;
    let limit = 10;

    let query: FindManyOptions = {
      where: filter as FindOptionsWhere<T>,
    };

    if (pagination) {
      page = pagination.page;
      limit = pagination.limit;
      const skip = (page - 1) * limit;

      query = {
        ...query,
        skip,
        take: limit,
      };
    }

    const [items, total] = await this.repository.findAndCount(query);

    return new Pagination<G>(items as unknown as Array<G>, page, limit, total);
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

  async removeMany(filter: Partial<T>): Promise<number> {
    const entities = await this.repository.find({ where: filter as FindOptionsWhere<T> });
    if (!entities.length) return 0;

    await this.repository.remove(entities);
    return entities.length;
  }
}
