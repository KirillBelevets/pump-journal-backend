import { Type } from 'class-transformer';
import {
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';

export class SetDto {
  @IsNumber()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class ExerciseDto {
  @IsString()
  name: string;

  @IsString()
  tempo: string;

  @IsNumber()
  @Min(0)
  rest: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SetDto)
  sets: SetDto[];
}

export class CreateTrainingDto {
  readonly userId: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  dayOfWeek?: string;

  @IsOptional()
  @IsString()
  timeOfDay?: string;

  @IsString()
  goal: string;

  @IsOptional()
  heartRate?: {
    start: number;
    end: number;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  exercises: ExerciseDto[];

  @IsOptional()
  @IsString()
  sessionNote?: string;
}
