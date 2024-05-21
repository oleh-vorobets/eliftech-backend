import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { HearAbout } from 'src/users/types/hear-about.enum';

export class AddUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  initials: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birth: Date;

  @IsEnum(HearAbout)
  hearAbout: string;
}
