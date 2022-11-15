import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { MatchesService } from 'src/factories/matches/services/matches.service';
import { SendMessageDto } from '../dtos/SendMessageDto';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private matchesService: MatchesService,
  ) {}

  async saveMessage({ match_id, text, sender_id }: SendMessageDto) {
    const matchedUserMatchId =
      await this.matchesService.getMatchIdFromMatchedUser(match_id);

    const createdMessages = await this.prisma.$transaction(
      [match_id, matchedUserMatchId].map((matchId, index) =>
        this.prisma.message.create({
          data: { is_seen: index === 0, match_id: matchId, text, sender_id },
        }),
      ),
    );

    return createdMessages[0];
  }

  seeMessages(match_id: string) {
    return this.prisma.message.updateMany({
      where: { match_id, is_seen: false },
      data: { is_seen: true },
    });
  }
}
