import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByIdWithPassword(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('+password').exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase().trim() })
      .select('+password _id email')
      .exec();

    console.log('🔎 Fetched user from DB:', user);

    return user;
  }

  async create(email: string, password: string): Promise<User> {
    const createdUser = new this.userModel({ email, password });
    return createdUser.save();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
