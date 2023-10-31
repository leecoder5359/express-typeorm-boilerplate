import {DataSource} from "typeorm";
import {
    MONGO_DATABASE,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_PW,
    MONGO_USER,
    PG_DATABASE,
    PG_HOST,
    PG_PORT, PG_PW,
    PG_USER
} from "../config";
export class DataSourceConfig {
    constructor() {
    }

    static createDataSource(dbType: string) {
        switch (dbType) {
            case "mongo":
                return new DataSource({
                    type: "mongodb",
                    host: MONGO_HOST,
                    port: Number(MONGO_PORT),
                    database: MONGO_DATABASE,
                    username: MONGO_USER,
                    password: MONGO_PW,
                    synchronize: true,
                    logging: false,
                    entities: [],
                    migrations: [],
                    subscribers: [],
                });
            case "pg":
                return new DataSource({
                    type: "postgres",
                    host: PG_HOST,
                    port: Number(PG_PORT),
                    username: PG_USER,
                    password: PG_PW,
                    database: PG_DATABASE,
                    synchronize: true,
                    logging: false,
                    entities: [],
                    migrations: [],
                    subscribers: [],
                })
            default:
                throw new Error("Invalid database type.");
        }
    }
}