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
export class SignInUseCase implements UseCase<string> {
  constructor(
    @Inject(REPOSITORY_TOKEN)
    private readonly usersRepository: UsersRepository<User>,
    @Inject(DATA_ACCESSOR_TOKEN)
    private readonly dataAccessor: DataAccessor,
    private readonly jwtService: JwtService,
  ) {}

  verifyPassword(inputtedPassword, encryptedPassword: string) {
    // TODO: 비밀번호 검증
    return inputtedPassword === encryptedPassword;
  }

  async execute(
    inputtedEmailAddress: string,
    inputtedPassword: string,
  ): Promise<string> {
    let queryRunner = null;

    try {
      queryRunner = await this.dataAccessor.connect();
      const user = await this.usersRepository.findOne(queryRunner, {
        emailAddress: inputtedEmailAddress,
      });

      if (!user) {
        throw new UserNotFoundError();
      }

      const isVaildPassword = this.verifyPassword(
        inputtedPassword,
        user.password,
      );

      if (!isVaildPassword) {
        throw new UnauthorizedError();
      }

      const payload = { sub: user.id, emailAddress: user.emailAddress };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw error;
    } finally {
      await this.dataAccessor.releaseQueryRunner(queryRunner);
    }
  }
}
