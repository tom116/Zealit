import { Request, Response } from "express";
import { SignUpRequest } from "../entities/user.entity";
import bcrypt from "bcrypt";
import { createUser, findUserByUsername } from "../queries/user";


export const signUp = async (req: SignUpRequest) => {
    //logic to handle the user signUp
   const { firstName, lastName, email, password } = req;
    //hash the password
    const existingUser = await findUserByUsername(email);
    if (existingUser) {
        return { error: "User already exists" };
    }
    //create the user
    const hashedPassword = await bcrypt.hash(password, 10);
   //save the user to the database
   return await createUser({ firstName, lastName, email, password: hashedPassword });
}

export const login = async (req: any) => {
    //logic to handle the user login
    const { userName, password } = req.body;
    //find the user
    const user = await findUserByUsername(userName);
    if (!user) {
        return { error: "User does not exist" };
    }
    //compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { error: "Invalid password" };
    }
    //return the user
    return user;
}

