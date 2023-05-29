import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
// import * as fs from 'fs';
import mongoose from 'mongoose';
import * as process from 'process';
import { apiRouter } from '~/processes/routing/index.js';

import { errorMiddleware } from '~/entities/ErrorMiddleware/index.js';

// import { HTMLParser } from '~/entities/HTMLParser/index.js';
// import { Transfer1cData } from '~/entities/Transfer1cData/index.js';
import { prepareBaseRouting } from '~/shared/lib/helpers/index.js';

// import { userService } from '~/entities/User/index.js';

dotenv.config();

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// console.log(computeDirName('.'));

// const parsedData = Transfer1cData(HTMLParser(fs.readFileSync(computeDirName('/assets/1c/test.html')).toString()));

// if (parsedData) console.log(transformObjectWithStringsToNumbers(parsedData));

// app.get('/', (_, res) => {
//   res.send(true);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// const parsedData = Transfer1cData(HTMLParser(fs.readFileSync(computeDirName('/assets/1c/test.html')).toString()));
//
// if (parsedData) console.log(transformObjectWithStringsToNumbers(parsedData));

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(fileUpload({ createParentPath: true }));

prepareBaseRouting(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiRouter);

app.use(errorMiddleware);

void mongoose
  .connect(process.env.DB_URL!, { dbName: process.env.DB_NAME })
  .then(() => app.listen(PORT, () => console.log(`Server started on ${PORT}`)));
