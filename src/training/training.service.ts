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

  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    console.log('DTO in service:', createTrainingDto);

    const newTraining = new this.trainingModel(createTrainingDto);
    return newTraining.save();
  }

  async findAll(): Promise<Training[]> {
    return this.trainingModel.find().sort({ date: -1 }).exec();
  }

  async findOne(id: string): Promise<Training> {
    const training = await this.trainingModel.findById(id).exec();
    if (!training) {
      throw new NotFoundException(`Training with id ${id} not found`);
    }
    return training;
  }

  async remove(id: string): Promise<void> {
    await this.trainingModel.findByIdAndDelete(id);
  }

  async update(id: string, updateDto: UpdateTrainingDto): Promise<Training> {
    const training = await this.trainingModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (!training) {
      throw new NotFoundException('Training session not found');
    }
    return training;
  }
}
