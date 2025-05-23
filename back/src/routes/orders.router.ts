import { Router } from "express";
import validateOrderCreate from "../middlewares/orderCreate.middleware";
import { createOrder } from "../controllers/order.controller";
import checkLogin from "../middlewares/checkLogin.middleware";
import {getUserOrders} from "../controllers/order.controller"

const ordersRouter = Router();

ordersRouter.post("/", checkLogin, validateOrderCreate, createOrder);
ordersRouter.get("/", checkLogin, getUserOrders);

export default ordersRouter;
