import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInRequestDto } from '../../dto/auth/auth.request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('/signIn')
  @ApiOperation({
    summary: '유저 토큰 발급',
    description:
      '모든 API 요청 헤더에 반드시 포함되어야 하는 유저 토큰을 발급한다. (임의로 유저 토큰을 발급하기 위한 기능이기 때문에 만료 시간, Refresh 등에 관한 규칙은 따로 설정하지 않음.)',
  })
  @ApiBody({ type: SignInRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { example: { accessToken: '{USER_ACCESS_TOKEN}' } },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async signIn(@Body(ValidationPipe) body: SignInRequestDto) {
    const MOCK_DATA = {
      accessToken: '{USER_ACCESS_TOKEN}',
    };
    return MOCK_DATA;
  }
}
