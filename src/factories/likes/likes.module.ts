import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';

@Module({
  imports: [],
  controllers: [LikesController],
  providers: [LikesService, PrismaService],
})
export class LikesModule {}
