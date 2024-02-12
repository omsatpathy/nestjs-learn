export declare class User {
    id: number;
    email: string;
    password: string;
    hashPasswordBeforeInsert(): void;
    first_name: string;
    last_name: string;
    dob: Date;
    isActive: boolean;
    otp: number;
    otpTimestamp: Date;
    createdAt: Date;
}
