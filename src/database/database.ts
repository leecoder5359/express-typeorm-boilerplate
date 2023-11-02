import {DataSource} from "typeorm";
import {
    PG_DATABASE,
    PG_HOST,
    PG_PORT, PG_PW,
    PG_USER
} from "../config";
import {logger} from "../utils/logger";
import path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: PG_HOST,
    port: Number(PG_PORT),
    username: PG_USER,
    password: PG_PW,
    database: PG_DATABASE,
    synchronize: true,
    logging: false,
    entities: [path.join(path.resolve(),"/src/entity/*.ts")],
    migrations: [],
    subscribers: [],
});

export const connect = async (dataSource: DataSource) => {
    try {
        await dataSource.initialize();
        logger.info(`=================================`);
        logger.info(`${dataSource.options.type} DB CONNECTED!`);
        logger.info(`=================================`);
    } catch (e) {
        logger.error(`=================================`);
        logger.error(`${dataSource.options.type} DB UNCONNECTED!`);
        logger.error(`${e}`);
        logger.error(`=================================`);
    }
}
