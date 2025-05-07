import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  user_name: string

  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  date_birth: string

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
  password: string

  @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
  confirm_password: string

  @IsNotEmpty({ message: 'Bạn phải đồng ý với điều khoản' })
  accepted: boolean
}
