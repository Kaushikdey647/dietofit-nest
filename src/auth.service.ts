import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUserMongo } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IUserMongo>) {}

  async validateUser(email: string, password: string): Promise<IUserMongo | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async createUser(user: any) {
    return this.userModel.create(user);
  }
}
