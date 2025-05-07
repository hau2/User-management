import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserAdminDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  user_name: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  date_birth: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
  password: string

  @ApiProperty({ enum: ['ADMIN', 'USER'] })
  @IsNotEmpty({ message: 'Quyền không được để trống' })
  @IsEnum(['ADMIN', 'USER'], { message: 'Quyền chỉ có thể là ADMIN hoặc USER' })
  role: 'ADMIN' | 'USER'

  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'] })
  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  @IsEnum(['ACTIVE', 'INACTIVE'], { message: 'Trạng thái phải là ACTIVE hoặc INACTIVE' })
  status: 'ACTIVE' | 'INACTIVE'
}
