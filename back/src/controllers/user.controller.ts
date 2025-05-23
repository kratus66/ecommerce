import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  loginUserService,
  registerUserService,
} from "../services/user.service";

export const registerUser = catchedController(
  async (req: Request, res: Response) => {
    const { email, password, name, address, phone } = req.body;
    const newUser = await registerUserService({
      email,
      password,
      name,
      address,
      phone,
    });
    res.status(201).send(newUser);
  }
);

export const login = catchedController(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userLoginData = await loginUserService({ email, password });

  res.status(200).send({
    login: true,
    user: userLoginData.user,  // Devuelve solo las propiedades necesarias del usuario
    token: userLoginData.token,
  });
});



