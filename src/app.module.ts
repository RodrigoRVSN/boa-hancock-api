import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { factoriesModules } from './factories';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

const configService = new ConfigService();
@Module({
  imports: [
    ...factoriesModules,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      // @ts-ignore
      store: redisStore,
      socket: {
        host: configService.get('REDIS_URL'),
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule {}
