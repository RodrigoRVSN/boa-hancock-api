import { Module } from '@nestjs/common';

import { PrismaService } from 'src/core/recipes/prisma.service';

import { MatchesController } from './controllers/matches.controller';
import { MatchesService } from './services/matches.service';

@Module({
  imports: [],
  controllers: [MatchesController],
  providers: [MatchesService, PrismaService],
})
export class MatchesModule {}
