import express from "express";
import {NODE_ENV, PORT} from "./config";
import {Routes} from "./interfaces/routes.interface";
import {logger} from "./utils/logger";
import {connect, AppDataSource} from "./database/database";
import { ErrorMiddleware } from "./middlewares/error.middleware";

export default class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }

    private connectToDatabase() {
        connect(AppDataSource);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(ErrorMiddleware);
    }
}