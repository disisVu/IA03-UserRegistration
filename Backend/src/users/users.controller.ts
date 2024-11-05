import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '~/users/users.service';
import { RegisterDto, LoginDto } from '~/users/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}
