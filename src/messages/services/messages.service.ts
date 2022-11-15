import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { SendMessageDto } from '../dtos/SendMessageDto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async saveMessage({ match_id, text }: SendMessageDto) {
    return await this.prisma.message.create({
      data: {
        match_id,
        text,
      },
      include: {
        match: {
          include: {
            matched_user: true,
          },
        },
      },
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
