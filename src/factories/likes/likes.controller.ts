import {
  Controller,
  MethodNotAllowedException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('swipe')
  async giveLikeOrDeslike(@Req() req) {
    const { id } = req.user;
    const { to_user_id, is_liked } = req.body;

    const hasLikeFound = await this.likesService.findLikeById(id, to_user_id);

    if (hasLikeFound) {
      throw new MethodNotAllowedException();
    }

    return this.likesService.giveLikeOrDeslike(id, to_user_id, is_liked);
  }
}
