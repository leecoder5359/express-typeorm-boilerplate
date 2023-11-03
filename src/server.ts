import App from "./app";
import { UserRoute } from "./routes/users.route";
import { AuthRoute } from "./routes/auth.route";
import { MainRouter } from "./routes/main.router";

const app = new App([new MainRouter(), new UserRoute(), new AuthRoute()]);

app.listen();
