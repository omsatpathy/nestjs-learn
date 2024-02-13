import { User } from "./User";
export declare class UserPassword {
    id: number;
    user_id: User;
    email: string;
    password: string;
    hashPasswordBeforeInsert(): void;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    updateUpdatedAtBeforeInsert(): void;
}
