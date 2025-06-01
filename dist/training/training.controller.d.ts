import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-tratining.dto';
import { Training } from './schemas/training.schema';
import { UpdateTrainingDto } from './dto/update-training.dto';
interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}
export declare class TrainingController {
    private readonly trainingService;
    constructor(trainingService: TrainingService);
    create(createDto: CreateTrainingDto, req: AuthenticatedRequest): Promise<Training>;
    update(id: string, updateDto: UpdateTrainingDto, req: AuthenticatedRequest): Promise<Training>;
    findAll(): Promise<Training[]>;
    findOne(id: string): Promise<Training>;
    remove(id: string): Promise<void>;
}
export {};
