import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 30, nullable: true})
    userName: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    email: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    password: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    googleId: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    kakaoId: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;


    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    static from(userName: string, email: string, password: string) {
        const user = new User();
        user.email = email;
        user.password = password;
        user.userName = userName;
        user.createdAt = new Date();
        return user;
    }
}
