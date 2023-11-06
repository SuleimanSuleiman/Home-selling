import express,{Express, NextFunction, Request, Response} from 'express';
import { logger } from './logger';
import helmet from "helmet";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors";

import UsersRoutes from "../routes/users.routes";
import BuildRoutes from "../routes/building.routes";

import deserializeUser from './authHandle';

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger';


export default function Server() {

    const app: Express = express();

    app.use(express.static('uploads'))
    
    app.use(express.json());
    app.use(cookieParser());
    app.use(deserializeUser)
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(helmet());
    app.use(morgan('tiny'));

    app.use(cors({
        origin: "*",
        // credentials:true
    }))

    const specs = swaggerJSDoc(options);
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );
    app.use('/users', UsersRoutes)
    app.use('/building', BuildRoutes)
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        const status:number = error.status || 500;
        const message:object = error.message || "an error happened";
        return res.status(status).json({
            success: false,
            status: status,
            data: message
        })
    })

    return app;
}