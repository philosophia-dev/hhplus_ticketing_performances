import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/auth/model/user.entity';
import {
  REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import {
  DataAccessor,
  TOKEN as DATA_ACCESSOR_TOKEN,
} from 'src/domain/base/data-accessor.interface';
import { UseCase } from 'src/application/base/use-case.interface';

@Injectable()
export class SignInUseCase implements UseCase<User> {
  constructor(
    @Inject(REPOSITORY_TOKEN)
    private usersRepository: UsersRepository<User>,
    @Inject(DATA_ACCESSOR_TOKEN)
    private dataAccessor: DataAccessor,
  ) {}

  async execute(): Promise<User> {
    return this.usersRepository.findOne();
  }
}
