import { Injectable } from '@nestjs/common';
import { HashingServiceInterface } from './hashing.service.interface';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingServiceInterface {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }
  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
