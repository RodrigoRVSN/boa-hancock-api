import { Module } from '@nestjs/common';
import { GithubStrategy, JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: '7d' },
          secret: configService.get('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [GithubStrategy, JwtStrategy],
})
export class AuthModule {}
