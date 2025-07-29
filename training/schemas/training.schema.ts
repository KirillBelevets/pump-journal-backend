import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 1. Set schema (without rest)
@Schema({ _id: false })
export class Set {
  @Prop({ required: true })
  reps: number;

  @Prop({ required: true })
  weight: number;

  @Prop()
  comment?: string;
}
export const SetSchema = SchemaFactory.createForClass(Set);

// 2. Exercise schema
@Schema({ _id: false })
export class Exercise {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  rest: number;

  @Prop({ required: true })
  tempo: string;

  @Prop({ type: [SetSchema], required: true })
  sets: Set[];

  @Prop()
  comment?: string;
}
export const ExerciseSchema = SchemaFactory.createForClass(Exercise);

// 3. Heart rate subdocument (optional, can also be plain object)
@Schema({ _id: false })
export class HeartRate {
  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;
}
export const HeartRateSchema = SchemaFactory.createForClass(HeartRate);

// 4. TrainingSession schema
@Schema()
export class Training extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  dayOfWeek: string;

  @Prop({ required: true })
  timeOfDay: string;

  @Prop({ required: true })
  goal: string;

  @Prop({ type: HeartRateSchema })
  heartRate?: HeartRate;

  @Prop({ type: [ExerciseSchema], required: true })
  exercises: Exercise[];

  @Prop()
  sessionNote?: string;
}
export const TrainingSchema = SchemaFactory.createForClass(Training);
