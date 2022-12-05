import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  async getAllMatchs(userId: string) {
    const usersMatched = await this.prisma.match.findMany({
      where: {
        user_id: userId,
      },
      orderBy: { matched_at: 'desc' },
      include: { matched_user: true, messages: true },
    });

    return usersMatched;
  }

  async makeMatch(fromUserId: string, toUserId: string) {
    return this.prisma.$transaction([
      this.prisma.match.create({
        data: {
          user_id: fromUserId,
          matched_user_id: toUserId,
        },
      }),
      this.prisma.match.create({
        data: {
          user_id: toUserId,
          matched_user_id: fromUserId,
        },
      }),
    ]);
  }

  async getMatchIdFromMatchedUser(match_id: string) {
    const matched = await this.prisma.match.findFirst({
      where: {
        id: match_id,
      },
      select: { matched_user_id: true },
    });
    const matchIdByMatchedUserId = await this.prisma.match.findFirst({
      where: {
        user_id: matched.matched_user_id,
      },
    });

    return matchIdByMatchedUserId.id;
  }

  getMatchedUserByMatchId(matchId: string) {
    return this.prisma.match.findFirst({
      where: { id: matchId },
      include: { matched_user: true },
    });
  }
}
