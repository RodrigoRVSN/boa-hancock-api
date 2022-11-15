import {
  Body,
  Controller,
  MethodNotAllowedException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GiveLikeOrDeslikeDto } from '../dtos/GiveLikeOrDeslikeDto';
import { LikesService } from '../services/likes.service';

@ApiBearerAuth()
@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('swipe')
  async giveLikeOrDeslike(
    @Body() { is_liked, to_user_id }: GiveLikeOrDeslikeDto,
    @Req() req,
  ) {
    const { id } = req.user;

    const hasLikeFound = await this.likesService.findLikeById(id, to_user_id);

    if (hasLikeFound) {
      throw new MethodNotAllowedException();
    }

    return this.likesService.giveLikeOrDeslike(id, to_user_id, is_liked);
  }
}
