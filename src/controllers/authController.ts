import {Request, Response} from "express";
import {ASSERT} from "../utils/error/assert";
import ERRORS from "../utils/error/errors";
import helper from "../utils/helper";
import UserModel from "../models/userModel";

const authController = {
    signUp: async (req: Request, res: Response) => {
        const message = req.body.message;
        const signature = req.body.signature;
        const publicKey = req.body.publicKey;
        const userType = req.body.userType; // 0: dao, 1: user

        const isValid = helper.verifySignature(message, signature, publicKey);

        if (!isValid) {
            ASSERT.error(ASSERT.clientError(ERRORS.INVALID_SIGN));
        }

        const address = helper.getEthereumAddressFromPublicKey(publicKey);
        const [loginData, err] = await UserModel.getWithAddress(address);

        ASSERT.error(err);

        if (loginData) {
            ASSERT.clientError(ERRORS.DUPLICATED_ADDRESS_ERROR);
        }


        let token;
        if (userType == 0) {
            //TODO: DAO
        } else {
            const [userId, err2] = await UserModel.create(address);

            ASSERT.error(err2);

            token = helper.generateAuthToken(address, userId);
        }

        const result = {
            token
        }

        const response = {
            success: true,
            data: result
        }

        res.send(response);
    },
    login: async (req: Request, res: Response) => {
        const message = req.body.message;
        const signature = req.body.signature;
        const publicKey = req.body.publicKey;

        const address = helper.getEthereumAddressFromPublicKey(publicKey);
        const [loginData, err] = await UserModel.getWithAddress(address);

        ASSERT.error(err);
        if (loginData) {
            const isValid = helper.verifySignature(message, signature, publicKey);
            if (isValid) {
                const token = helper.generateAuthToken(address, loginData.id);
                res.json({token});
            } else {
                ASSERT.clientError(ERRORS.INVALID_SIGN);
            }
        } else {
            ASSERT.error(ASSERT.clientError(ERRORS.NOT_EXIST_USER));
        }
    }
}

export default authController;