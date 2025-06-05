import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  Put,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-tratining.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Training } from './schemas/training.schema';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  async create(
    @Body() createDto: CreateTrainingDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const data = { ...createDto, userId: req.user.userId };
    return this.trainingService.create(data);
  }

  @Get()
  async findAll(@Request() req: AuthenticatedRequest): Promise<Training[]> {
    return this.trainingService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<Training> {
    return this.trainingService.findOneForUser(id, req.user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTrainingDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const data = { ...updateDto, userId: req.user.userId };
    return this.trainingService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.trainingService.remove(id, req.user.userId);
  }
}
