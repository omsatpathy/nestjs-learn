import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({ name: 'otp' })
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ nullable: true })
    otp: number;

    @Column({ nullable: true })
    otpTimestamp: Date;
}