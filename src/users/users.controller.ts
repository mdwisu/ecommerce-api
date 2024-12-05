import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.findOneByEmail(body.email);
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { accessToken: 'your-jwt-token' }; // JWT token generation
  }
}
