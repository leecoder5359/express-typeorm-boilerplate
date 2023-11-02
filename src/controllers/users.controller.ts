import { UserService } from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { CreateUserDto, UpdateUserDto } from "../dtos/users.dto";
import { ApiResponse } from "../libs/ApiResponse";

export class UserController {
    private userService: UserService = new UserService();

    getAllUsers = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const users = await this.userService.findAllUsers();

            res.status(200).json({ data: users, message: "findAll" });
        } catch (error) {
            next(error);
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const id = Number(req.params.id);
            const user = await this.userService.findUserById(id);

            res.send(new ApiResponse(user, "findUserById"))
        } catch (error) {
            next(error);
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const createUser: CreateUserDto = req.body;
            const users = await this.userService.createUser(createUser);
            res.send(new ApiResponse(users, "createUser"))

        } catch (error) {
            next(error);
        }
    }

    updateUserById = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const id = Number(req.params.id);
            const updateUser: UpdateUserDto = req.body;

            const result = await this.userService.updateUserById(id, updateUser);

            res.send(new ApiResponse(result, "updateUserById"))
        } catch (error) {
            next(error);
        }
    }

    removeUserById = async (req: Request, res: Response, next: NextFunction)=> {
        try {
            const id = Number(req.params.id);
            const result = await this.userService.deleteUserById(id);

            res.send(new ApiResponse(result, "deleteUserById"));
        } catch (error) {
            next(error);
        }
    }
}

