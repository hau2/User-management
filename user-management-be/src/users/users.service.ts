/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import * as bcrypt from 'bcryptjs'
import { UpdateUserDto } from './dto/update-user.dto'
import { RegisterDto } from './dto/register.dto'
import { CreateUserAdminDto } from './dto/create-user-admin.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async register(dto: RegisterDto) {
    const { email, password, confirm_password, date_birth, accepted } = dto

    if (!accepted) {
      throw new BadRequestException('Bạn phải đồng ý với điều khoản sử dụng')
    }

    if (password !== confirm_password) {
      throw new BadRequestException('Mật khẩu xác nhận không trùng khớp')
    }

    const exists = await this.userRepo.findOne({ where: { email } })
    if (exists) {
      throw new BadRequestException('Email đã tồn tại')
    }

    const today = new Date()
    const birth = new Date(date_birth)
    if (birth > today) {
      throw new BadRequestException('Ngày sinh không hợp lệ')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
      role: 'USER', // ✅ Mặc định là USER
      status: 'ACTIVE'
    })

    const saved = await this.userRepo.save(user)

    return {
      message: 'Đăng ký thành công',
      user: {
        id: saved.id,
        email: saved.email,
        user_name: saved.user_name,
        role: saved.role
      }
    }
  }

  async createByAdmin(dto: CreateUserAdminDto) {
    const { email, password, date_birth } = dto

    const existing = await this.userRepo.findOne({ where: { email } })
    if (existing) {
      throw new BadRequestException('Email đã tồn tại')
    }

    const today = new Date()
    const birth = new Date(date_birth)
    if (birth > today) {
      throw new BadRequestException('Ngày sinh không hợp lệ')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword
    })

    const saved = await this.userRepo.save(user)

    return {
      message: 'Tài khoản đã được tạo thành công',
      user: {
        id: saved.id,
        email: saved.email,
        user_name: saved.user_name,
        role: saved.role,
        status: saved.status
      }
    }
  }

  async create(dto: CreateUserDto) {
    const { email, password, confirm_password, date_birth } = dto

    // Kiểm tra email trùng
    const existing = await this.userRepo.findOne({ where: { email } })
    if (existing) throw new BadRequestException('Email đã tồn tại')

    // Kiểm tra mật khẩu trùng khớp
    if (password !== confirm_password) throw new BadRequestException('Mật khẩu không trùng khớp')

    // Kiểm tra ngày sinh
    const inputDate = new Date(date_birth)
    const now = new Date()

    // So sánh chỉ theo ngày (không tính giờ)
    const isFuture =
      inputDate.getFullYear() > now.getFullYear() ||
      (inputDate.getFullYear() === now.getFullYear() && inputDate.getMonth() > now.getMonth()) ||
      (inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getDate() > now.getDate())

    if (isFuture) {
      throw new BadRequestException('Ngày sinh không hợp lệ (trong tương lai)')
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = this.userRepo.create({
      ...dto,
      password: hashed,
      role: 'USER'
    })

    return await this.userRepo.save(user)
  }

  async findAll(keyword?: string, page = 1, limit = 10, status?: string) {
    const query = this.userRepo.createQueryBuilder('user')

    console.log('keyword: ', keyword)

    if (keyword) {
      query.andWhere('user.user_name ILIKE :kw', { kw: `%${keyword}%` })
    }

    if (status) {
      query.andWhere('user.status = :status', { status })
    }

    query.skip((page - 1) * limit).take(limit)
    query.orderBy('user.created_at', 'DESC')

    const [data, total] = await query.getManyAndCount()

    return {
      data,
      total,
      page,
      limit
    }
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } })
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) throw new NotFoundException('Không tìm thấy tài khoản')

    if (dto.password) {
      const salt = await bcrypt.genSalt()
      dto.password = await bcrypt.hash(dto.password, salt)
    }

    Object.assign(user, dto)
    return await this.userRepo.save(user)
  }

  async remove(id: number, currentUser: any) {
    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) throw new NotFoundException('Không tìm thấy tài khoản')

    if (Number(currentUser.id) === Number(id) && currentUser.role === 'ADMIN') {
      throw new BadRequestException('ADMIN không thể tự xóa chính mình')
    }

    return await this.userRepo.remove(user)
  }
}
