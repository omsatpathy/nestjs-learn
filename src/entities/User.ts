import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as md5 from 'md5';

@Entity({ name: 'users' }) 
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert() 
    hashPasswordBeforeInsert() {
        this.password = md5(this.password);
    }

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ type: 'date', default: null })
    dob: Date;

    @Column({ default: true, nullable: false, type: 'boolean' })
    isActive: boolean;

    @Column({ nullable: true })
    otp: number;

    @Column({ nullable: true })
    otpTimestamp: Date;
    
    @Column({ type: 'date', default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` }) 
    createdAt: Date;
}