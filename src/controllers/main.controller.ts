import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/users.dto";
import { userService } from "../services/user.service";

export class MainController {
    private userService;

    constructor() {
        this.userService = userService;
    }

    renderHome = (req: Request, res: Response, next: NextFunction) => {
        res.render("index");
    };

    logout = (req: Request, res: Response, next: NextFunction) => {
        req.logout(function(err) {
            if (err) return next(err);

            res.redirect("/login");
        });
    };


    renderSignUp = (req: Request, res: Response, next: NextFunction) => {
        res.render("signup");
    };

    renderLogin = (req: Request, res: Response, next: NextFunction) => {
        res.render("login");
    };

    login = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local", (err: any, user: Express.User, info: any) => {
            if (err) return next(err);

            if (!user) return res.json({ msg: info });

            req.login(user, function(err) {
                if (err) return next(err);

                res.redirect("/");
            });
        })(req, res, next);
    };

    signUp = async (req: Request, res: Response, next: NextFunction) => {
        const user: CreateUserDto = req.body;

        try {
            await this.userService.signUp(user);
            res.render("login");
        } catch (e) {
            next(e);
        }
    };
}

export const mainController = new MainController();

