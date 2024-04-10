import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/signIn')
  @Header('Authorization', 'none')
  async signIn(
    @Body(ValidationPipe) body: { email_address: string; password: string },
  ) {
    const mockData = {
      accessToken: '{USER_ACCESS_TOKEN}',
    };
    return mockData;
  }
}
