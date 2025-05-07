import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  user_name: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  date_birth: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
  password: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
  confirm_password: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Bạn phải đồng ý điều khoản' })
  accepted: boolean
}
