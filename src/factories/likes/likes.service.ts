import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

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
        await this.prisma.match.createMany({
          data: [
            {
              user_id: fromUserId,
              matched_user_id: toUserId,
            },
            {
              matched_user_id: fromUserId,
              user_id: toUserId,
            },
          ],
        });

        return { is_match: true };
      }
    }

    return { is_match: false };
  }
}
