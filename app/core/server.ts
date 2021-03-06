import express from 'express';
import ProcessRoute from './ProcessRoute';
import bodyparser from 'body-parser';
import cors from "cors";
import * as dotenv from 'dotenv';
export class Server {
    public app: express;

    private port;

    public static bootstrap(){
        return new Server();
    }

    constructor(){
        dotenv.config();
        this.port = process.env.PORT ? process.env.PORT : 3000 ;
        this.app = express();
        this.app.use(bodyparser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(bodyparser.json());
        
        this.app.use(ProcessRoute.router);
    }

    public startServer(){
        this.app.listen(this.port);
        console.log('its running at port '+this.port);
    }
}
