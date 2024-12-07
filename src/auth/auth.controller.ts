import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    // Cari pengguna berdasarkan email
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordValid = await this.usersService.validatePassword(
      user,
      password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    // Login berhasil, buat JWT
    return this.authService.login(user);
  }
}
