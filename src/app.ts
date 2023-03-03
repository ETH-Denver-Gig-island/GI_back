import * as express from 'express';
import * as cors from 'cors';
import * as asyncify from 'express-asyncify';

import config from "./config";

const PORT = 3001;

class App {
    public application: express.Application;

    constructor() {
        this.application = express();
    }
}

const app = new App().application;
const router = asyncify(express.Router());

router.use();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://localhost']
    }
));