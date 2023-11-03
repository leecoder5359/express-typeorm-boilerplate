import { User as UserEntity } from "../entity/user.entity";

declare global {
    namespace Express {
        export interface User extends UserEntity {
        }
    }
}