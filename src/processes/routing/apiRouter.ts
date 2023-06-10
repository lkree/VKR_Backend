import { Router } from 'express';

import { citiesPrefixRouter } from '~/entities/CitiesPrefix';
import { configRouter } from '~/entities/Config';
import { emailSenderRouter } from '~/entities/EmailSender';
import { fileRouter } from '~/entities/File';
import { leftoversRouter } from '~/entities/Leftovers';
import { minimalLeftoversRouter } from '~/entities/MinimalLeftovers';
import { responsiblePersonsRouter } from '~/entities/Responsibles';
import { userRouter } from '~/entities/User';

const apiRouter = Router();

apiRouter.use('/api', userRouter);
apiRouter.use('/api', citiesPrefixRouter);
apiRouter.use('/api', leftoversRouter);
apiRouter.use('/api', fileRouter);
apiRouter.use('/api', minimalLeftoversRouter);
apiRouter.use('/api', configRouter);
apiRouter.use('/api', responsiblePersonsRouter);
apiRouter.use('/api', emailSenderRouter);

export { apiRouter };
