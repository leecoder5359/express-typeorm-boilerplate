import { Request, Response, Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { mainController } from "../controllers/main.controller";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { CreateUserDto } from "../dtos/users.dto";
import { authenticateUser } from "../middlewares/auth.middleware";

export class MainRouter implements Routes {
    public path = "";
    public router = Router();
    public controller = mainController;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`/`, authenticateUser, this.controller.renderHome);
        this.router.get(`/login`, this.controller.renderLogin);
        this.router.post(`/login`, this.controller.login);
        this.router.get(`/signup`, this.controller.renderSignUp);
        this.router.post(`/signup`, ValidationMiddleware(CreateUserDto), this.controller.signUp);
        this.router.post(`/logout`, this.controller.logout);
    }

    private render(req: Request, res: Response) {
        const { renderPage } = req.params;
        res.render(renderPage);
    }
}