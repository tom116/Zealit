import { User } from "../models/user";
import { SignUpRequest } from "../entities/user.entity";
import { AppDataSource } from "../db/data-source";

export const findUserByUsername = async (email: string) => {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.findOne({ where: { email } });
};

export const createUser = async (user: SignUpRequest) => {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create(user); // Create a new User instance
    return userRepository.save(newUser);
}