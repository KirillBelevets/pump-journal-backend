import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class HeartRate {
  @Prop() start: number;
  @Prop() end: number;
}

export const HeartRateSchema = SchemaFactory.createForClass(HeartRate);
