import { PartialType } from '@nestjs/swagger';
import { YoutubeDto } from './create-youtube.dto';

export class UpdateYoutubeDto extends PartialType(YoutubeDto) {}
