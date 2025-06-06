import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  [x: string]: string | Buffer;
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
