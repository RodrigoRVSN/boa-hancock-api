import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ICallback } from './auth.types';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {}

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() { user }: ICallback, @Res() res) {
    const payload = { sub: user.id, username: user.username };

    const accessToken = this.jwtService.sign(payload);

    res.redirect(
      `${this.configService.get('CLIENT_URL')}?token=${accessToken}`,
    );

    return { accessToken };
  }
}
