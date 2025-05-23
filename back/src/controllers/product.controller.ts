import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getProductsService } from "../services/products.service";

export const getProducts = catchedController(
  
  async (req: Request, res: Response) => {
    console.log("obteniendo productos");
    const products = await getProductsService();
    res.json(products);
  }
);
