import {logger} from "../utils/logger";
import {DataSourceConfig} from "./DataSourceConfig";
import {DataSource} from "typeorm";

type DatabaseType = "MONGO" | "PG";
export default class DatabaseConnection {
    constructor() {
    }

    static async initialize(dbType: string) {
        const dataSource = DataSourceConfig.createDataSource(dbType);
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
}
