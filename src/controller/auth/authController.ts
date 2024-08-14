import { Request, Response } from 'express';
import * as authServices from '../../services/user';
import { LoginRequest, SignUpRequest } from '../../entities/user.entity';

// Signup controller
export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const payload: SignUpRequest = req.body;
        const response = await authServices.signUp(payload);
        return res.json(response);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.toString() });
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