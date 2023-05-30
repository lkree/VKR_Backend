import { Router } from 'express';

import { citiesPrefixRouter } from '~/entities/CitiesPrefix/index.js';
import { configRouter } from '~/entities/Config/index.js';
import { fileRouter } from '~/entities/File/index.js';
import { leftoversRouter } from '~/entities/Leftovers/index.js';
import { minimalLeftoversRouter } from '~/entities/MinimalLeftovers/index.js';
import { userRouter } from '~/entities/User/index.js';

const apiRouter = Router();

apiRouter.use('/api', userRouter);
apiRouter.use('/api', citiesPrefixRouter);
apiRouter.use('/api', leftoversRouter);
apiRouter.use('/api', fileRouter);
apiRouter.use('/api', minimalLeftoversRouter);
apiRouter.use('/api', configRouter);

export { apiRouter };
