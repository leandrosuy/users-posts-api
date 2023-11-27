import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  user_id: number;
}
