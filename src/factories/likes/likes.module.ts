import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MatchesService } from '../matches/services/matches.service';

@Module({
  imports: [],
  controllers: [LikesController],
  providers: [LikesService, MatchesService, PrismaService],
})
export class LikesModule {}
