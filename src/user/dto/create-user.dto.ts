import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(18)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  /* at least 1 upper case letter
   * at least 1 lower case letter
   * at least 1 number or special character */
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
