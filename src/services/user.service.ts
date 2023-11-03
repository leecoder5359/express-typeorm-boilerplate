import { CreateUserDto, UpdateUserDto } from "../dtos/users.dto";
import { User } from "../entity/user.entity";
import { ObjectLiteral, Repository } from "typeorm";
import { MassageException } from "../exceptions/massage.exception";
import { AppDataSource } from "../database/database";

export class UserService {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    constructor() {
    }

    async findAllUsers() {
        return await this.userRepository.findBy({});
    }

    async findUserById(id: number) {
        return await this.userRepository.findBy({id});
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = createUserDto.toUserEntity()
        await this.userRepository.save(user);
    }

    async updateUserById(id: number, updateUser: UpdateUserDto): Promise<ObjectLiteral[]> {
        const result = await this.userRepository.update(id,{...updateUser});
        return result.generatedMaps;
    }

    async deleteUserById(id: number) {
        const result = await this.userRepository.delete(id);
        const affected = result?.affected

        if (!affected) return 0;

        return affected;
    }

    private async checkExistUserByEmail(email: string) {
        return await this.userRepository.findOneBy({email});
    }

    async signUp(createUserDto: CreateUserDto) {
        const user = await this.checkExistUserByEmail(createUserDto.email);

        if (!user) {
            await this.createUser(createUserDto);
            return;
        }

        if (user.password) {
            throw new Error("이미 존재하는 Email 입니다.");
        }

        const { password, ...updateFields } = createUserDto;
        this.userRepository.merge(user, {...updateFields});
        await this.userRepository.save(user);
    }
}

export const userService = new UserService();
