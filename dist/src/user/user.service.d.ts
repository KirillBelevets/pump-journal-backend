import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findByEmail(email: string): Promise<User | null>;
    create(email: string, password: string): Promise<User>;
    findById(id: string): Promise<User | null>;
}
