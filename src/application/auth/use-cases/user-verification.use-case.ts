import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/auth/model/user.model';
import {
  REPOSITORY_TOKEN,
  UsersRepository,
} from 'src/domain/auth/repositories/users.repository';
import {
  DataAccessor,
  TOKEN as DATA_ACCESSOR_TOKEN,
} from 'src/domain/base/data-accessor.interface';
import { UseCase } from 'src/application/base/use-case.interface';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError, UserNotFoundError } from '../exceptions';

@Injectable()
export class UserVerificationUseCase implements UseCase<boolean> {
  constructor(
    @Inject(REPOSITORY_TOKEN)
    private readonly usersRepository: UsersRepository<User>,
    @Inject(DATA_ACCESSOR_TOKEN)
    private readonly dataAccessor: DataAccessor,
    private readonly jwtService: JwtService,
  ) {}

  async execute(inputtedId: string): Promise<boolean> {
    let queryRunner = null;

    try {
      queryRunner = await this.dataAccessor.connect();
      const user = await this.usersRepository.findOne(queryRunner, {
        id: inputtedId,
      });

      if (!user) {
        throw new UserNotFoundError();
      } else return true;
    } catch (error) {
      throw error;
    } finally {
      await this.dataAccessor.releaseQueryRunner(queryRunner);
    }
  }
}
