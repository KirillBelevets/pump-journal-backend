import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';

import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-tratining.dto';
import { Training } from './schemas/training.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    @Body() dto: CreateTrainingDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const data: CreateTrainingDto & { userId: string } = {
      ...dto,
      userId: req.user.userId,
    };
    return this.trainingService.create(data);
  }

  @Get()
  async findAll(): Promise<Training[]> {
    return this.trainingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Training> {
    return this.trainingService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.trainingService.remove(id);
  }
}
