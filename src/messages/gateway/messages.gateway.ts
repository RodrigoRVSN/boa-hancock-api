import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { SendMessageDto } from '../dtos/SendMessageDto';
import { MessagesService } from '../services/messages.service';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() messageData: SendMessageDto) {
    const message = await this.messagesService.saveMessage(messageData);

    this.server.emit('receivedMessage', message);

    return message;
  }

  @SubscribeMessage('typing')
  async handleTyping(@MessageBody() nameOfWhoIsTyping: string) {
    this.server.emit('typing', { name: nameOfWhoIsTyping });
  }
}
