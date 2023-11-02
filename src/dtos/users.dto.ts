import { IsString, IsNotEmpty, MaxLength, IsNumber } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message: "firstName은 필수값 입니다."})
    @MaxLength(50)
    public firstName: string;

    @IsString()
    @IsNotEmpty({message: "lastName은 필수값 입니다."})
    @MaxLength(50)
    lastName: string;

    @IsNumber()
    @IsNotEmpty({message: "age는 필수값 입니다."})
    @MaxLength(50)
    age: number;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty({message: "firstName은 필수값 입니다."})
    @MaxLength(50)
    public firstName: string;

    @IsString()
    @IsNotEmpty({message: "lastName은 필수값 입니다."})
    @MaxLength(50)
    lastName: string;

    @IsNumber()
    @IsNotEmpty({message: "age는 필수값 입니다."})
    @MaxLength(50)
    age: number;
}