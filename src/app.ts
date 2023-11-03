import express from "express";
import { COOKIE_ENCRYPTION_KEY, NODE_ENV, PORT } from "./config";
import {Routes} from "./interfaces/routes.interface";
import {logger} from "./utils/logger";
import {connect, AppDataSource} from "./database/database";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { Passport } from "./config/Passport";
import passport from "passport";
import cookieSession from "cookie-session";
import path from "path";
import { regenerate } from "./middlewares/regenerate.middleware";

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
        this.initializeView();
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
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieSession({
            name: "cookie-session-name",
            keys: [COOKIE_ENCRYPTION_KEY as string],
        }));
        this.app.use(passport.session());
        this.app.use(passport.initialize());
        this.app.use(regenerate);
        Passport.init();
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeView() {
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(path.resolve(), "src", "views"));
    }

    private initializeErrorHandling() {
        this.app.use(ErrorMiddleware);
    }
}