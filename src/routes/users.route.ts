import { Router } from "express";
import { userController, UserController } from "../controllers/users.controller";
import { Routes } from "../interfaces/routes.interface";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { CreateUserDto, UpdateUserDto } from "../dtos/users.dto";

export class UserRoute implements Routes {
    public path = "/users";
    public router = Router();
    private userController: UserController = userController;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.userController.getAllUsers);
        this.router.post(this.path, ValidationMiddleware(CreateUserDto), this.userController.createUser);
        this.router.get(`${this.path}/:id`, this.userController.getUserById);
        this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateUserDto), this.userController.updateUserById);
        this.router.delete(`${this.path}/:id`, this.userController.removeUserById);
    }
}
