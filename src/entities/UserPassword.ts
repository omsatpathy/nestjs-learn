import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import * as md5 from 'md5';


@Entity({ name: 'user_Passwords' })
export class UserPassword {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user_id: User;

    @Column() 
    email: string;

    @Column()
    password: string;

    @BeforeInsert() 
    hashPasswordBeforeInsert() {
        this.password = md5(this.password);
    }

    @Column({ default: true, nullable: false, type: 'boolean' })
    isActive: boolean;
   
    @Column({ type: 'date', default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` }) 
    createdAt: Date;

    @Column({ type: 'date', default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` }) 
    updatedAt: Date;

    @BeforeUpdate() 
    updateUpdatedAtBeforeInsert() {
        this.updatedAt = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
    }

}