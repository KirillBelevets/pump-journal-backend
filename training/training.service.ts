// training.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Training } from './schemas/training.schema';
import { CreateTrainingDto } from './dto/create-tratining.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<Training>,
  ) {}

  async create(
    createTrainingDto: CreateTrainingDto & { userId: string },
  ): Promise<Training> {
    const newTraining = new this.trainingModel(createTrainingDto);
    return newTraining.save();
  }

  async findAllForUser(userId: string): Promise<Training[]> {
    return this.trainingModel.find({ userId }).sort({ date: -1 }).exec();
  }

  async findOneForUser(id: string, userId: string): Promise<Training> {
    const training = await this.trainingModel
      .findOne({ _id: id, userId })
      .exec();
    if (!training) {
      throw new NotFoundException(`Training not found or unauthorized`);
    }
    return training;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.trainingModel.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!result) {
      throw new NotFoundException('Training not found or unauthorized');
    }
  }

  async update(
    id: string,
    updateDto: UpdateTrainingDto & { userId: string },
  ): Promise<Training> {
    const training = await this.trainingModel.findOne({
      _id: id,
      userId: updateDto.userId,
    });
    if (!training) {
      throw new NotFoundException('Training not found or unauthorized');
    }

    Object.assign(training, updateDto);
    return training.save();
  }
}
