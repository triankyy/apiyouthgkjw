import { IsObject, IsString } from 'class-validator';
import { UserDto } from '../user/dto/user.dto';
import { IsExist } from '../../validators/exist.validator';
import { Youtube } from './youtube.entity';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';

export class YoutubeDto {
  @IsExist([Youtube, 'id'])
  id: number;

  @IsString()
  youtube_id: string;

  @IsObject()
  user: UserDto;
}

export class CreateYoutubeDto extends OmitType(YoutubeDto, ['id']) {}
export class YoutubeIdDto extends PickType(YoutubeDto, ['id']) {}
export class UpdateYoutubeDto extends PartialType(YoutubeDto) {}
