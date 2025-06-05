import { Model } from 'mongoose';
import { Training } from './schemas/training.schema';
import { CreateTrainingDto } from './dto/create-tratining.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
export declare class TrainingService {
    private trainingModel;
    constructor(trainingModel: Model<Training>);
    create(createTrainingDto: CreateTrainingDto & {
        userId: string;
    }): Promise<Training>;
    findAllForUser(userId: string): Promise<Training[]>;
    findOneForUser(id: string, userId: string): Promise<Training>;
    remove(id: string, userId: string): Promise<void>;
    update(id: string, updateDto: UpdateTrainingDto & {
        userId: string;
    }): Promise<Training>;
}
