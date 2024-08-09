import { Router } from "express";
import * as authController from "./controller/auth/authController";

const authenticationRoutes = {
    signUp: "/signup",
    login: "/login",
}

const authenticationRouter = Router({
    mergeParams: true,
});

//this is the login and signup apis
authenticationRouter.post(authenticationRoutes.signUp,authController.signup);
authenticationRouter.post(authenticationRoutes.login,authController.login);

export default authenticationRouter;
