import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { IGithubUser } from 'src/core/types/IGithubUser';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(username: string) {
    const userFound = await this.prisma.user.findFirst({
      where: {
        /*  login: {
          not: username,
        }, */
      },
    });

    return userFound;
  }

  async giveLike(fromUserId: string, toUserId: string, isLiked = false) {
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
        await this.prisma.match.create({
          data: {
            user_id: fromUserId,
            matched_user_id: toUserId,
          },
        });
      }
    }
  }

  async findByUsernameOrCreate(username: string, payload: { _raw: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        login: username,
      },
    });

    if (user) return user.id;

    const userInfo: IGithubUser = JSON.parse(payload._raw);

    const createdUser = await this.prisma.user.create({
      data: {
        avatar_url: userInfo.avatar_url,
        login: userInfo.login,
        repos_url: userInfo.repos_url,
        name: userInfo.name,
        company: userInfo.company,
        blog: userInfo.blog,
        location: userInfo.location,
        email: userInfo.email,
        hireable: userInfo.hireable,
        bio: userInfo.bio,
        twitter_username: userInfo.twitter_username,
      },
    });

    return createdUser.id;
  }
}
