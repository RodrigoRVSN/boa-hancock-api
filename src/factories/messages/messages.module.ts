import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { MatchesService } from 'src/factories/matches/services/matches.service';
import { MessagesController } from './controllers/messages.controller';
import { MessagesGateway } from './gateway/messages.gateway';
import { MessagesService } from './services/messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesGateway, MessagesService, MatchesService, PrismaService],
})
export class MessagesModule {}
