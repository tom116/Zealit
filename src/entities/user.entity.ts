export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive?: boolean;
    createdAt?: Date;
}

export interface SignUpRequest {
    firstName: string; // Remove the exclamation mark
    lastName: string; // Remove the exclamation mark
    email: string; // Remove the exclamation mark
    password: string; // Remove the exclamation mark
}

export class LoginRequest {
    userName!: string;
    password!: string;
}   