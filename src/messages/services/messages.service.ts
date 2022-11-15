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

  async saveMessage({ match_id, text }: SendMessageDto) {
    const matchedUserMatchId =
      await this.matchesService.getMatchIdFromMatchedUser(match_id);

    return await this.prisma.message.createMany({
      data: [
        { match_id, text },
        { match_id: matchedUserMatchId, text },
      ],
    });
  }

  async getMessagesByMatchId(matchId: string) {
    return await this.prisma.message.findMany({
      where: {
        match_id: matchId,
      },
      include: {
        match: { include: { matched_user: true } },
      },
    });
  }
}
