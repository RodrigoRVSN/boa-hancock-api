import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { MatchesService } from 'src/factories/matches/services/matches.service';

@Injectable()
export class LikesService {
  constructor(
    private prisma: PrismaService,
    private matchesService: MatchesService,
  ) {}

  async findLikeById(fromUserId: string, toUserId: string) {
    return this.prisma.like.findFirst({
      where: { user_id: fromUserId, to_user_id: toUserId },
    });
  }

  async giveLikeOrDeslike(
    fromUserId: string,
    toUserId: string,
    isLiked = false,
  ) {
    await this.prisma.like.create({
      data: {
        user_id: fromUserId,
        to_user_id: toUserId,
        is_liked: isLiked,
      },
    });

    if (isLiked) {
      const hasFoundMatch = await this.prisma.like.findFirst({
        where: {
          user_id: toUserId,
          to_user_id: fromUserId,
          AND: { is_liked: true },
        },
      });

      if (hasFoundMatch) {
        const match = await this.matchesService.makeMatch(fromUserId, toUserId);

        return { is_match: true, match_id: match[0].id };
      }
    }

    return { is_match: false };
  }
}
