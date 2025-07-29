import { Document } from 'mongoose';
export declare class Set {
    reps: number;
    weight: number;
    comment?: string;
}
export declare const SetSchema: import("mongoose").Schema<Set, import("mongoose").Model<Set, any, any, any, Document<unknown, any, Set, any> & Set & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Set, Document<unknown, {}, import("mongoose").FlatRecord<Set>, {}> & import("mongoose").FlatRecord<Set> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Exercise {
    name: string;
    rest: number;
    tempo: string;
    sets: Set[];
    comment?: string;
}
export declare const ExerciseSchema: import("mongoose").Schema<Exercise, import("mongoose").Model<Exercise, any, any, any, Document<unknown, any, Exercise, any> & Exercise & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Exercise, Document<unknown, {}, import("mongoose").FlatRecord<Exercise>, {}> & import("mongoose").FlatRecord<Exercise> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class HeartRate {
    start: number;
    end: number;
}
export declare const HeartRateSchema: import("mongoose").Schema<HeartRate, import("mongoose").Model<HeartRate, any, any, any, Document<unknown, any, HeartRate, any> & HeartRate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HeartRate, Document<unknown, {}, import("mongoose").FlatRecord<HeartRate>, {}> & import("mongoose").FlatRecord<HeartRate> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Training extends Document {
    userId: string;
    date: Date;
    dayOfWeek: string;
    timeOfDay: string;
    goal: string;
    heartRate?: HeartRate;
    exercises: Exercise[];
    sessionNote?: string;
}
export declare const TrainingSchema: import("mongoose").Schema<Training, import("mongoose").Model<Training, any, any, any, Document<unknown, any, Training, any> & Training & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Training, Document<unknown, {}, import("mongoose").FlatRecord<Training>, {}> & import("mongoose").FlatRecord<Training> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
