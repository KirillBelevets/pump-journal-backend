export declare class SetDto {
    reps: number;
    weight: number;
    comment?: string;
}
export declare class ExerciseDto {
    name: string;
    tempo: string;
    rest: number;
    sets: SetDto[];
    comment?: string;
}
export declare class CreateTrainingDto {
    readonly userId: string;
    date: string;
    dayOfWeek?: string;
    timeOfDay?: string;
    goal: string;
    heartRate?: {
        start: number;
        end: number;
    };
    exercises: ExerciseDto[];
    sessionNote?: string;
}
