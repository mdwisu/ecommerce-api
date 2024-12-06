import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, // User service untuk mencari user berdasarkan email
  ) {}

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    console.log(payload); //payload sudah ada
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
