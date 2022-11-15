import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { LikesService } from './services/likes.service';
import { LikesController } from './controllers/likes.controller';
import { MatchesService } from '../matches/services/matches.service';

@Module({
  imports: [],
  controllers: [LikesController],
  providers: [LikesService, MatchesService, PrismaService],
})
export class LikesModule {}
