import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  user_name?: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  date_birth?: string

  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string

  @ApiProperty()
  @IsOptional()
  status?: string

  @ApiProperty()
  @IsOptional()
  @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
  password?: string
}
