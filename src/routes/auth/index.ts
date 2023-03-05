import * as express from 'express';
import helper from "../../utils/helper";
import {ASSERT} from "../../utils/error/assert";
import ERRORS from "../../utils/error/errors";
const router = express.Router();

const checkToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token: string = req.headers.authorization;

    let isValid = true;
    isValid = isValid && !(!token);

    if (!isValid) {
        ASSERT.error(ASSERT.clientError(ERRORS.TOKEN_EMPTY_ERROR));
    }

    const [, err] = await helper.verifyAuthToken(token);
    ASSERT.error(err);

    next();
}

router.use(checkToken);

// 토큰 검증이 필요한 라우터
router.get('/', (req, res) => {
    // ...
});

// 토큰 검증이 필요한 dao 용 라우터
router.get('/dao', (req, res) => {
    // ...
});

// 토큰 검증이 필요한 user 용 라우터
router.get('/user', (req, res) => {
    // ...
});

export default router;