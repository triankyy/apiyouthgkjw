import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ default: 'admin@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'admin', required: true })
  @IsString()
  password: string;
}
