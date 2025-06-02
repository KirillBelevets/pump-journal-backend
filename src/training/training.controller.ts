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
import { Training } from './schemas/training.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateTrainingDto } from './dto/update-training.dto';

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
    console.log('POST /trainings called');

    console.log('Request user:', req.user);

    const data: CreateTrainingDto & { userId: string } = {
      ...createDto,
      userId: req.user.userId,
    };
    return this.trainingService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTrainingDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const data = {
      ...updateDto,
      userId: req.user.userId,
    };
    return this.trainingService.update(id, data);
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
