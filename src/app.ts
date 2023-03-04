import * as express from 'express';
import * as cors from 'cors';
import * as asyncify from 'express-asyncify';
import indexRouter from "./routes/index";

import config from "./utils/config";

const PORT = 3001;

class App {
    public application: express.Application;

    constructor() {
        this.application = asyncify(express());
    }
}

const app = new App().application;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://localhost']
    }
));

app.use('/', indexRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

function errorHandler(err, req, res, next) {
    const errorResult = err.message ? {
        success: false,
        error: err.name,
        message: err?.message,
        stack: err.stack,
    } : {
        success: false,
        error: err.name,
    };

    res.status(500).send(errorResult);
}