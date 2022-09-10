import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsUrl } from 'class-validator';
import { UserDto } from '../../user/dto/create-user.dto';
import { IsExist } from '../../../validators/exist.validator';
import { Content } from '../entities/content.entity';

export class ContentDto {
  @ApiProperty()
  @IsExist([Content, 'id'])
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsUrl()
  content_link: string;

  @ApiProperty({ format: 'binary', required: true })
  @IsOptional()
  file: string;

  @IsObject()
  user: UserDto;
}
export class CreateContentDto extends OmitType(ContentDto, ['id']) {}
export class ContentIdDto extends PickType(ContentDto, ['id']) {}
