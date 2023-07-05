import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { BaseRepositoryInterface } from './base.repository.interface';

interface Identifiable {
  id: any;
}

export abstract class BaseRepositoryAbstract<T extends Identifiable>
  implements BaseRepositoryInterface<T>
{
  private readonly repository: Repository<T>;

  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  createMany(data: DeepPartial<T>[]): T[] {
    return this.repository.create(data);
  }

  save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(data);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  findByCondition(filterCondition: FindOneOptions<any>): Promise<T> {
    return this.repository.findOne(filterCondition);
  }

  findOneById(id: any): Promise<T> {
    return this.repository.findOneBy({ id });
  }

  updateById(id: string, data: DeepPartial<T>): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  update(entity: T, data: DeepPartial<T>): Promise<UpdateResult> {
    return this.repository.update(entity, data);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  findWithRelations(relations: FindOptionsRelations<T>): Promise<T[]> {
    return this.repository.find({ relations });
  }

  preload(entityLike: DeepPartial<T>): Promise<T> {
    return this.repository.preload(entityLike);
  }

  createQueryBuilder(alias?: string): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias);
  }
}
