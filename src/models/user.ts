import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, MinLength } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    @IsEmail()
    email!: string;

    @Column()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    password!: string;

    @Column({ default: false })
    isActive!: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;
}