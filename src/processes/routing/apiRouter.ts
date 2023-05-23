import { Router } from 'express';

import { citiesPrefixRouter } from '~/entities/CitiesPrefix/index.js';
import { fileRouter } from '~/entities/File/index.js';
import { leftoversRouter } from '~/entities/Leftovers/index.js';
import { userRouter } from '~/entities/User/index.js';

const apiRouter = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/citiesPrefix', citiesPrefixRouter);
apiRouter.use('/leftovers', leftoversRouter);
apiRouter.use('/file', fileRouter);

export { apiRouter };
