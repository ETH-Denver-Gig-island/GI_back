import knex from '../database/knex';
import DB_TABLE from '../database/db_table';
import ERRORS from "../utils/error/errors";
import {ASSERT} from "../utils/error/assert";
import {IDaoWork, TPR} from "../database/interface";

const DaoWorkModel = {
    create: async (dao_id: number, address: string, pay_amount: number, pay_date, user_role): TPR<number> => {
        const data: Omit<IDaoWork, 'id'> = {
            dao_id,
            address,
            pay_amount,
            pay_date,
            user_role
        };

        const result = await knex<IDaoWork>(DB_TABLE.DAO_WORK)
            .insert(data)
            .returning(['id'])
            .catch((err) => {
                const error = ASSERT.serverError(ERRORS.MYSQL_ERROR, err.message);
                ASSERT.error(error);
            });

        return [result[0] as number, null];
    }
}

export default DaoWorkModel;