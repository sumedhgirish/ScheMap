import express from "express";
import { requestValidator } from "./middleware/verify.js";
import cookieParser from "cookie-parser";

import projects_router from "./routes/projects.js";
import auth_router from "./routes/authenticate.js";
import users_router from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/projects", requestValidator);
app.use("/api/users", requestValidator);

app.use("/api/auth", auth_router);
app.use("/api/projects", projects_router);
app.use("/api/users", users_router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
