import { Body, Controller, Post, Get, UseGuards, Patch, Param, Delete, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUser } from './get-user.decorator'
import { RegisterDto } from './dto/register.dto'
import { CreateUserAdminDto } from './dto/create-user-admin.dto'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới (mặc định quyền USER)' })
  async register(@Body() dto: RegisterDto) {
    return await this.userService.register(dto)
  }

  @Post('create-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin tạo mới tài khoản người dùng' })
  async createUser(@Body() dto: CreateUserAdminDto) {
    return await this.userService.createByAdmin(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tài khoản (lọc, tìm kiếm, phân trang)' })
  async getUsers(
    @Query('keyword') keyword?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: 'ACTIVE' | 'INACTIVE'
  ) {
    return await this.userService.findAll(keyword, +page, +limit, status)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật tài khoản' })
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Xoá tài khoản (ADMIN không tự xoá)' })
  async deleteUser(@Param('id') id: number, @GetUser() user: any) {
    return await this.userService.remove(id, user)
  }
}
