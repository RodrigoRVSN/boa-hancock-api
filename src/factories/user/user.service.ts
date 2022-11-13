import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/recipes/prisma.service';
import { IGithubUser } from 'src/core/types/IGithubUser';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByIdOrCreate(id: number, payload: { _raw: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) return;

    const userInfo: IGithubUser = JSON.parse(payload._raw);

    await this.prisma.user.create({
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
  }
}
