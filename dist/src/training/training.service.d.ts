import { Model } from 'mongoose';
import { Training } from './schemas/training.schema';
import { CreateTrainingDto } from './dto/create-tratining.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
export declare class TrainingService {
    private trainingModel;
    constructor(trainingModel: Model<Training>);
    create(createTrainingDto: CreateTrainingDto): Promise<Training>;
    findAll(): Promise<Training[]>;
    findOne(id: string): Promise<Training>;
    remove(id: string): Promise<void>;
    update(id: string, updateDto: UpdateTrainingDto): Promise<Training>;
}
