import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await this.userService.findByEmail(email)

    if (!user) throw new UnauthorizedException('Email không tồn tại')
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new UnauthorizedException('Mật khẩu không đúng')

    const payload = { email: user.email, sub: user.id, role: user.role }
    const token = this.jwtService.sign(payload)

    return {
      message: 'Đăng nhập thành công',
      redirect: user.role === 'ADMIN' ? '/dashboard' : '/home',
      token,
      role: user.role // ✅ thêm dòng này để FE đọc trực tiếp
    }
  }
}
