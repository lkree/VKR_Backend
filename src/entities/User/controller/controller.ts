import type { NextFunction, Request, Response } from 'express';

import { tokenService } from '~/entities/Token/index.js';
import { userService } from '~/entities/User/index.js';

import { ApiError } from '~/shared/lib/ApiError/index.js';
import { BaseController, Controller } from '~/shared/lib/BaseController/index.js';
import { RequestDataFields, RequestPropsValidation } from '~/shared/lib/decorators/index.js';
import { isString } from '~/shared/lib/helpers/index.js';

import {
  accessTokenValidationObject,
  emailPasswordValidationObject,
  refreshTokenValidationObject,
} from '../lib/helpers/index.js';

const cookieParameters = { maxAge: 10 * 365 * 24 * 60 * 60 * 1000, httpOnly: true };

class UserController extends BaseController implements Controller<typeof userService> {
  @RequestPropsValidation(emailPasswordValidationObject)
  async registration(req: Request, res: Response, __: NextFunction) {
    const { email, password } = req.body;
    const userData = await userService.registration(email, password);

    res.cookie('refreshToken', userData.refreshToken, cookieParameters);

    res.json(userData);
  }

  @RequestPropsValidation(emailPasswordValidationObject)
  async login(req: Request, res: Response, __: NextFunction) {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);

    res.cookie('refreshToken', userData.refreshToken, cookieParameters);
    res.cookie('accessToken', userData.accessToken, cookieParameters);

    res.json(userData);
  }

  @RequestPropsValidation(accessTokenValidationObject, RequestDataFields.Cookies)
  session(req: Request, res: Response, __: NextFunction) {
    const { accessToken } = req.cookies;

    const result = tokenService.validateAccessToken(accessToken);

    if (result) res.json(result);
    else throw ApiError.UnauthorizedError();
  }

  @RequestPropsValidation(refreshTokenValidationObject, RequestDataFields.Cookies)
  async logout(req: Request, res: Response, __: NextFunction) {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    res.json(token);
  }

  @RequestPropsValidation(refreshTokenValidationObject, RequestDataFields.Cookies)
  async refresh(req: Request, res: Response, __: NextFunction) {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);

    res.cookie('refreshToken', userData.refreshToken, cookieParameters);

    res.json(userData);
  }

  @RequestPropsValidation(refreshTokenValidationObject, RequestDataFields.Cookies)
  @RequestPropsValidation({ emailForMailings: isString, email: isString })
  async update(req: Request, res: Response, __: NextFunction) {
    const { accessToken } = req.cookies;

    const result = tokenService.validateAccessToken(accessToken);

    if (result) {
      const { emailForMailings, email } = req.body;

      res.json(await userService.update({ emailForMailings, email }));
    } else {
      throw ApiError.UnauthorizedError();
    }
  }

  async getAll(_: Request, res: Response, __: NextFunction) {
    res.json(await userService.getAll());
  }
}

export const userController = new UserController();
