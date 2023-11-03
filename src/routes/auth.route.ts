import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoute implements Routes {
    public path = "/auth";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:strategy`, this.authController.oAuth);
        this.router.get(`${this.path}/:strategy/callback`, this.authController.oAuthCallback);
    }
}