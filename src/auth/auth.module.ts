import { Module } from '@nestjs/common';
import { GithubStrategy, JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserService } from 'src/factories/user/user.service';
import { PrismaService } from 'src/core/recipes/prisma.service';

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
  providers: [GithubStrategy, JwtStrategy, UserService, PrismaService],
})
export class AuthModule {}
