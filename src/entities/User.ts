import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as md5 from 'md5';

@Entity({ name: 'users' }) 
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    phone_no: number;

    @Column()
    occupation: string;

    @Column()
    address: string;
    
    @Column({ type: 'date', default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` }) 
    createdAt: Date;

    @Column({ type: 'date', default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` }) 
    updatedAt: Date;

    @BeforeUpdate() 
    updateUpdatedAtBeforeInsert() {
        this.updatedAt = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
    }
}