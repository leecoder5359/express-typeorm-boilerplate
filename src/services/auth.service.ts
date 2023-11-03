import { Profile as KakaoProfile } from "passport-kakao";
import { Profile as GoogleProfile } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../database/database";
import { Repository } from "typeorm";

type VerifyCallback = (error: any, user?: any, info?: any) => void;

export class AuthService {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    constructor() {
    }

    deserializeUser = async (id: number, done: VerifyCallback) => {
        const existedUser = await this.userRepository.findBy({ id });

        if (existedUser) done(null, existedUser);
    };
    serializeUser = async (user: Express.User, done: VerifyCallback) => {
        done(null, user.id);
    };

    localVerify = async (email: string, password: string, done: VerifyCallback) => {
        try {
            console.log("this", this);
            const user = await this.userRepository.findOneBy({ email: email.toLocaleLowerCase() });
            if (!user) return done(null, false, { msg: `Email ${email} not found` });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, isMatch, { msg: "올바르지 않은 비밀번호 입니다." });

            return done(null, user);
        } catch (e) {
            done(e);
        }
    };

    kakaoVerify = async (accessToken: string, refreshToken: string, profile: KakaoProfile, done: VerifyCallback) => {
        try {
            let user = await this.userRepository.findOneBy({ kakaoId: profile.id });

            if (!user) {
                user = new User();
                user.email = profile._json.kakao_account.email;
                user.kakaoId = profile.id;

                await this.userRepository.save(user);
            }

            done(null, user);
        } catch (e) {
            console.log(e);
            done(e);
        }
    };

    googleVerify = async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) => {
        try {
            const googleId = profile.id;
            const email = profile.emails ? profile.emails[0].value : "";

            let user = await this.userRepository.findOne({
                where: [
                    { googleId },
                    { email },
                ],
            });

            if (!user) {
                user = new User();
                user.email = email;
                user.googleId = googleId;

                await this.userRepository.save(user);
            }

            if (!user.googleId) {
                user.googleId = googleId;
                await this.userRepository.update(user.id, user);
            }

            if (!user.email) {
                user.email = email;
                await this.userRepository.update(user.id, user);
            }

            done(null, user);
        } catch (e) {
            done(e);
        }
    };
}

export const authService = new AuthService();