import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy, VerifyFunction } from "passport-kakao";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_PASSWORD, KAKAO_API_KEY } from "./index";
import { AuthService, authService } from "../services/auth.service";

export class Passport {
    private passport;
    private authService: AuthService;

    constructor() {
        this.passport = passport;
        this.authService = authService;
        this.initializeLocalStrategies();
        this.initializeKakaoStrategies();
        this.initializeGoogleStrategies();
    }

    static init() {
        return new Passport();
    }

    private initializeLocalStrategies() {
        this.passport.use("local", new LocalStrategy({
            usernameField: "email", passwordField: "password",
        }, this.authService.localVerify));
        this.passport.serializeUser(this.authService.serializeUser);
        this.passport.deserializeUser(this.authService.deserializeUser);
    }

    private initializeKakaoStrategies() {
        this.passport.use("kakao", new KakaoStrategy({
            clientID: KAKAO_API_KEY as string,
            callbackURL: "/auth/kakao/callback",
        }, this.authService.kakaoVerify));
    }

    private initializeGoogleStrategies() {
        this.passport.use("google", new GoogleStrategy({
            "clientID": GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_CLIENT_PASSWORD as string,
            callbackURL: "/auth/google/callback",
            scope: ["email", "profile"],
        }, this.authService.googleVerify));
    }
}
