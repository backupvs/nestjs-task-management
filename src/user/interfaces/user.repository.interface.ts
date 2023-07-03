import { BaseRepositoryInterface } from '../../repositories/base/base.repository.interface';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
  createUser(createUserDto: CreateUserDto): Promise<void>;
}
