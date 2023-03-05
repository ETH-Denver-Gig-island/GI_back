import knex from '../database/knex';
import DB_TABLE from '../database/db_table';
import ERRORS from "../utils/error/errors";
import {ASSERT} from "../utils/error/assert";
import {IDaoWork, IUser, TPR} from "../database/interface";

const UserModel = {
    create: async (address: string): TPR<number> => {
        const data: Omit<IUser, 'id'> = {
            address
        };

        const result = await knex<IUser>(DB_TABLE.USER)
            .insert(data)
            .returning(['id'])
            .catch((err) => {
                const error = ASSERT.serverError(ERRORS.MYSQL_ERROR, err.message);
                ASSERT.error(error);
            });

        return [result[0] as number, null];
    },
    getWithAddress: async (address: string): TPR<IUser> => {
        const result = await knex<IUser>(DB_TABLE.USER)
            .where({address})
            .catch((err) => {
                const error = ASSERT.serverError(ERRORS.MYSQL_ERROR, err.message);
                ASSERT.error(error);
            });

        return [result[0] as IUser, null];
    },
    getWithId: async (id: number): TPR<IUser> => {
        const result = await knex<IUser>(DB_TABLE.USER)
            .where({id})
            .catch((err) => {
                const error = ASSERT.serverError(ERRORS.MYSQL_ERROR, err.message);
                ASSERT.error(error);
            });

        return [result[0] as IUser, null];
    },
    getWorkList: async (address: string): TPR<any> => {
        const result = await knex
            .select(
                'DaoWork.address as dao_work_address',
                'DaoWork.pay_amount',
                'DaoWork.pay_date',
                'DaoWork.user_role',
                'DAO.address as dao_address',
                'DAO.nickname as dao_nickname'
            )
            .from('User')
            .join('DaoWork', 'User.address', '=', 'DaoWork.address')
            .join('DAO', 'DaoWork.dao_id', '=', 'DAO.id')
            .catch((err) => {
                const error = ASSERT.serverError(ERRORS.MYSQL_ERROR, err.message);
                ASSERT.error(error);
            });

        return [result, null];
    }
}

export default UserModel;