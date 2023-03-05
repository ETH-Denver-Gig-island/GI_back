import knex from '../database/knex';
import DB_TABLE from '../database/db_table';
import ERRORS from "../utils/error/errors";
import {ASSERT} from "../utils/error/assert";
import {INFT, TPR} from "../database/interface";

const NFTModel = {
    mint: async (image, user_id, mint_id, meta_url): TPR<number> => {
        const data: Omit<INFT, 'id'> = {
            image,
            user_id,
            mint_id,
            meta_url
        };

        const result = await knex<INFT>(DB_TABLE.NFT)
            .insert(data)
            .returning(['id'])
            .catch((err) => {
                const error = ASSERT.serverError(ERRORS.MYSQL_ERROR, err.message);
                ASSERT.error(error);
            });

        return [result[0] as number, null];
    },
    getList: async (user_id): TPR<any> => {
        const result = await knex<INFT>(DB_TABLE.NFT)
            .select('image', 'mint_id', 'meta_url')
            .where({user_id})
            .catch((err) => {
                const error = ASSERT.serverError(ERRORS.MYSQL_ERROR, err.message);
                ASSERT.error(error);
            });

        return [result, null];
    }
}

export default NFTModel;