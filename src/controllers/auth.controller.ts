import passport, { Strategy } from "passport";
import { NextFunction, Request, Response } from "express";
import { MassageException } from "../exceptions/MassageException";

export class AuthController {

    oAuth = async (req: Request, res: Response, next: NextFunction) => {
        const { strategy } = req.params;
        this.validateStrategy(strategy);
        passport.authenticate(strategy)(req, res, next);
    }

    oAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
        const { strategy } = req.params;

        this.validateStrategy(strategy);

        passport.authenticate(strategy, {
            successReturnToOrRedirect: "/",
            failureRedirect: "/login",
        })(req, res, next);
    }

    private validateStrategy(strategy: string) {
        switch (strategy) {
            case "google":
            case "kakao":
                break;
            default:
                throw new MassageException("해당 strategy가 존재하지 않습니다.");
        }
    }
}

