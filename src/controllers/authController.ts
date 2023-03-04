import {Request} from "express";
import {ASSERT} from "../utils/error/assert";
import ERRORS from "../utils/error/errors";

const userController = {
    singup: async (req: Request, res: Response) => {
        const message = req.body.message;
        const signature = req.body.signature;
        const publicKey = req.body.publicKey;

        const isValid = message && signature && publicKey;
    }
}