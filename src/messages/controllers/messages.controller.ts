import {
  CacheInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessagesService } from '../services/messages.service';

@ApiBearerAuth()
@ApiTags('Messages')
@Controller('messages')
@UseInterceptors(CacheInterceptor)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':matchId')
  async getMessagesFromMatch(@Param('matchId') matchId: string) {
    const messages = await this.messagesService.getMessagesByMatchId(matchId);

    if (!messages) {
      throw new NotFoundException();
    }

    return messages;
  }
}
