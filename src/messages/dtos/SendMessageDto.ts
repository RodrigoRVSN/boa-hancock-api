import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  match_id: string;

  @ApiProperty()
  text: string;
}
