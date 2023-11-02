import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../database/database";

export class UserRepository {
    private repository: Repository<User> = AppDataSource.getRepository(User);

    constructor() {
    }

    findAll(): Promise<User[]> {
        return this.repository.find();
    }

    findById(id: number): Promise<User | null> {
        return this.repository.findOneBy({ id });
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }

    updateById(id: number, user: User): Promise<UpdateResult> {
        return this.repository.update(id, user);
    }

    deleteById(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
