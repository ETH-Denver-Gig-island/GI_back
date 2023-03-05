import Knex from 'knex';
import config from "../utils/config";
import * as dot from "dotenv";
dot.config();

const prodPool = {
    host: process.env.HOST??'host',
    port: process.env.PORT??3306,
    user: 'gigIsland',
    password: process.env.PASS??'pass',
    database: process.env.DATABASE_NAME??'name'
}

const localPool = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'White789!',
    database: 'gigIsland'
};

const knex = Knex({
    client: 'mysql2',
    connection: config?.ENV === 'PROD' ? prodPool : localPool
});

export default knex;