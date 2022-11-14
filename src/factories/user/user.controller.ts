import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getRandomUser(@Req() req) {
    return this.userService.getRandomUser(req.user.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('like')
  giveLikeOrDeslike(@Req() req) {
    const { id } = req.user;
    const { to_user_id, is_liked } = req.body;

    return this.userService.giveLikeOrDeslike(id, to_user_id, is_liked);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    // TODO: use this route to return the user info in personal profile
    return req.user;
  }
}
