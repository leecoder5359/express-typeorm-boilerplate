import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos/users.dto";
import { User } from "../entity/user.entity";
import { mapper } from "../mapper/mapper";
import { ObjectLiteral } from "typeorm";

export class UserService {
    private userRepository: UserRepository = new UserRepository();

    constructor() {
    }

    async findAllUsers() {
        return this.userRepository.findAll();
    }

    async findUserById(id: number) {
        return this.userRepository.findById(id);
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = mapper(createUserDto, User);
        await this.userRepository.save(user);
    }

    async updateUserById(id: number, updateUser: UpdateUserDto): Promise<ObjectLiteral[]> {
        const userEntity = mapper(updateUser, User);
        const result = await this.userRepository.updateById(id, userEntity);
        return result.generatedMaps;
    }

    async deleteUserById(id: number) {
        const result = await this.userRepository.deleteById(id);
        const affected = result?.affected

        if (!affected) return 0;

        return affected;
    }
}
