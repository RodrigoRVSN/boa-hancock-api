import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { IGithubUser } from 'src/core/types/IGithubUser';
import { Profile } from 'passport-github';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getRandomUser(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        login: { not: username },
        likes: {
          every: {
            is_seen: false,
          },
        },
      },
    });
  }

  async getUserById(userId: string) {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async findByUsernameOrCreate({ username, _raw }: Profile) {
    const user = await this.prisma.user.findFirst({
      where: {
        login: username,
      },
    });

    if (user) return user.id;

    const userInfo: IGithubUser = JSON.parse(_raw);

    const createdUser = await this.prisma.user.create({
      data: {
        avatar_url: userInfo.avatar_url,
        login: userInfo.login,
        repos_url: userInfo.repos_url,
        name: userInfo.name || '',
        company: userInfo.company,
        blog: userInfo.blog,
        location: userInfo.location,
        email: userInfo.email,
        hireable: userInfo.hireable || false,
        bio: userInfo.bio,
        twitter_username: userInfo.twitter_username,
      },
    });

    return createdUser.id;
  }
}
