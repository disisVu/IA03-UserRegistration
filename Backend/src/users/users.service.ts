import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto';
import { User, UserDocument } from '~/users/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerDto: RegisterDto): Promise<any> {
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

    return user.save();
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      // Successful login, generate JWT token here if needed
      return { message: 'Login successful' };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
}
