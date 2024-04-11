import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
  @ApiProperty({ example: 'user@example.com', description: '' })
  email_address: string;

  @ApiProperty({ example: 'password', description: '' })
  password: string;
}
