import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  sender_id: string;

  @ApiProperty()
  match_id: string;

  @ApiProperty()
  text: string;
}
