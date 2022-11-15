import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
} from '@nestjs/websockets';
import { SendMessageDto } from '../dtos/SendMessageDto';
import { MessagesService } from '../services/messages.service';

@WebSocketGateway({ cors: true })
export class MessagesGateway {
  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() messageData: SendMessageDto) {
    console.log(messageData);
    await this.messagesService.saveMessage(messageData);
  }
}
