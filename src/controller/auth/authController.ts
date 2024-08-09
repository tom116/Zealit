import { Request, Response } from 'express';
import * as authServices from '../../services/user';
import { LoginRequest, SignUpRequest } from '../../entities/user.entity';

// Signup controller
export const signup = async (payload: SignUpRequest):Promise<any> => {
    try {
        console.log("this is the payload", payload.email);
        const response = await authServices.signUp(payload);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//login controller
export const login = async (req: LoginRequest) => {
    try {
        const response = await authServices.login(req);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}