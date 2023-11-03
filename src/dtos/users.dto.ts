import { IsString, IsNotEmpty, MaxLength, IsNumber, IsOptional } from "class-validator";
import { User } from "../entity/user.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message: "name은 필수값 입니다."})
    @MaxLength(50)
    userName: string;

    @IsString()
    @IsNotEmpty({message: "email은 필수값 입니다."})
    @MaxLength(50)
    email: string;

    @IsString()
    @IsNotEmpty({message: "password은 필수값 입니다."})
    @MaxLength(50)
    password: string;

    toUserEntity() {
        return User.from(
            this.userName,
            this.email,
            this.password,
        )
    }
}

export class UpdateUserDto {
    @IsString()
    @MaxLength(50)
    @IsOptional()
    userName: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    email: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    kakaoId: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    googleId: string;
}