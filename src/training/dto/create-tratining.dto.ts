export class CreateTrainingDto {
  readonly userId: string;
  readonly date: Date;
  readonly dayOfWeek: string;
  readonly timeOfDay: string;
  readonly goal: string;
  readonly heartRate?: {
    start: number;
    end: number;
  };
  readonly exercises: {
    name: string;
    tempo: string;
    rest: number;
    comment?: string;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];
  readonly sessionNote?: string;
}
