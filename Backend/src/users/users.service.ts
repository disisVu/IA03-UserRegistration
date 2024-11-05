import { ConflictException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from '~/Users/dto';
import { User, UserDocument } from '~/users/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; status: number }> {
    // Check if email is already used
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    const user = new this.userModel({
      email: registerDto.email,
      password: hashedPassword,
    });

    await user.save();
    return { message: 'Registration successful', status: HttpStatus.CREATED };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; status: number }> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      // Successful login, optionally generate a JWT token here
      return { message: 'Login successful', status: HttpStatus.OK };
    } else {
      return {
        message: 'Invalid credentials',
        status: HttpStatus.UNAUTHORIZED,
      };
    }
  }
}
