import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-tratining.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './schemas/training.schema';
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
    findAll(req: AuthenticatedRequest): Promise<Training[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<Training>;
    update(id: string, updateDto: UpdateTrainingDto, req: AuthenticatedRequest): Promise<Training>;
    remove(id: string, req: AuthenticatedRequest): Promise<void>;
}
export {};
