import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';

export interface BaseRepositoryInterface<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findByCondition(filterCondition: FindOneOptions): Promise<T>;
  findOneById(id: any): Promise<T>;
  update(id: any, data: DeepPartial<T>): Promise<UpdateResult>;
  delete(id: any): Promise<DeleteResult>;
  findWithRelations(relations: FindOptionsRelations<T>): Promise<T[]>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  createQueryBuilder(alias?: string): SelectQueryBuilder<T>;
}
