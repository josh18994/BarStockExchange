import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { CreateUserInput } from "./types/user.input";
import * as bcrypt from 'bcrypt';

export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    async createUser(input: CreateUserInput): Promise<User> {
        const { username, password, email, firstName, lastName } = input;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await new this.userModel(
            {
                username,
                password: hashedPassword,
                email,
                firstName,
                lastName,
                salt
            });

        return user.save();
    }

    async getUserByUsername(username: string): Promise <User>{
        return this.userModel.findOne({username});
    }

    async getUserByEmail(email: string): Promise <User>{
        return this.userModel.findOne({email});
    }

    async getAllUsers(): Promise<User[]>{
        return this.userModel.find();
    }
}