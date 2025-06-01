export declare class HeartRate {
    start: number;
    end: number;
}
export declare const HeartRateSchema: import("mongoose").Schema<HeartRate, import("mongoose").Model<HeartRate, any, any, any, import("mongoose").Document<unknown, any, HeartRate, any> & HeartRate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HeartRate, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<HeartRate>, {}> & import("mongoose").FlatRecord<HeartRate> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
