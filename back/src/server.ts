import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";
import dotenv from 'dotenv';
import path from "path";
import helmet from "helmet"; // Agregar helmet

const app = express();

const allowedOrigins = [
  'https://front-henry-m4-pt20b-6thx.vercel.app', // Tu frontend en Vercel
  'http://localhost:3005' // Tu frontend local para desarrollo
];

app.use(cors({
  origin: (origin, callback) => {
    // Si el origen es undefined (por ejemplo, en solicitudes internas), permite la solicitud
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  optionsSuccessStatus: 200, // Para navegadores antiguos
}));


const bodyParser = require("body-parser"); router.use(bodyParser.json());


app.use(express.json());
app.use(morgan("dev"));

// Rutas de tu aplicación
app.use(router);

// Servir archivos estáticos
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).send({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
});

export default app; 

