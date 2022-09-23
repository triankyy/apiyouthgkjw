import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';
import { IsExist } from '../../../validators/exist.validator';
import { Youtube } from '../entities/youtube.entity';

export class YoutubeDto {
  @ApiProperty()
  @IsExist([Youtube, 'id'])
  id: number;

  @IsString()
  @ApiProperty()
  youtube_id: string;

  @IsObject()
  user: UserDto;
}

export class CreateYoutubeDto extends OmitType(YoutubeDto, ['id']) {}
export class YoutubeIdDto extends PickType(YoutubeDto, ['id']) {}