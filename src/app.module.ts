import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './factories/user/user.controller';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
