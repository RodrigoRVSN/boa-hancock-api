import { ApiProperty } from '@nestjs/swagger';

export class GiveLikeOrDeslikeDto {
  @ApiProperty()
  to_user_id: string;

  @ApiProperty()
  is_liked: boolean;
}
