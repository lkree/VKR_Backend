import type { NextFunction, Request, Response } from 'express';

import { tokenService } from '~/entities/Token';

import { ApiError } from '~/shared/lib/ApiError';
import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestDataFields, RequestPropsHandle } from '~/shared/lib/decorators';
import { isObject, isString } from '~/shared/lib/helpers';

import { userService } from '../api';
import {
  emailAssertObject,
  emailPasswordValidationObject,
  refreshTokenValidationObject,
  transformDBUserAndTokenToFE,
  transformDBUserArrayToFE,
  transformDBUserToFE,
} from '../lib/helpers';

const cookieParameters = { maxAge: 10 * 365 * 24 * 60 * 60 * 1000, httpOnly: true };

class UserController extends BaseController implements Controller<typeof userService> {
  @RequestPropsHandle({
    validate: [{ validationObject: emailPasswordValidationObject }],
    assert: [{ assertObject: emailAssertObject }],
    transform: { out: transformDBUserAndTokenToFE },
  })
  async registration(req: Request, res: Response, __: NextFunction) {
    const { email, password, cityBounding } = req.body;
    const userData = await userService.registration({ email, password, cityBounding });

    res.cookie('refreshToken', userData.refreshToken, cookieParameters);

    res.json(userData);
  }

  @RequestPropsHandle({
    validate: [{ validationObject: emailPasswordValidationObject }],
    assert: [{ assertObject: emailAssertObject }],
    transform: { out: transformDBUserAndTokenToFE },
  })
  async login(req: Request, res: Response, __: NextFunction) {
    const { email, password } = req.body;
    const userData = await userService.login({ email, password });

    res.cookie('refreshToken', userData.refreshToken, cookieParameters);
    res.cookie('accessToken', userData.accessToken, cookieParameters);

    res.json(userData);
  }

  session(req: Request, res: Response, __: NextFunction) {
    const { accessToken } = req.cookies;

    const result = tokenService.validateAccessToken(accessToken);

    if (result && isObject(result)) res.json(result);
    else throw ApiError.UnauthorizedError();
  }

  @RequestPropsHandle({
    validate: [{ validationObject: refreshTokenValidationObject, fieldToExecuteData: RequestDataFields.Cookies }],
  })
  async logout(req: Request, res: Response, __: NextFunction) {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    res.json(token);
  }

  @RequestPropsHandle({
    validate: [{ validationObject: refreshTokenValidationObject, fieldToExecuteData: RequestDataFields.Cookies }],
    transform: { out: u => ({ ...u, ...transformDBUserToFE(u) }) },
  })
  async refresh(req: Request, res: Response, __: NextFunction) {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);

    res.cookie('refreshToken', userData.refreshToken, cookieParameters);

    res.json(userData);
  }

  @RequestPropsHandle({
    validate: [{ validationObject: { email: isString, password: isString } }],
    assert: [{ assertObject: emailAssertObject }],
    transform: { out: transformDBUserArrayToFE },
  })
  async update(req: Request, res: Response, __: NextFunction) {
    res.json(await userService.update(req.body));
  }

  @RequestPropsHandle({
    validate: [{ validationObject: { email: isString } }],
    assert: [{ assertObject: emailAssertObject }],
    transform: { out: transformDBUserArrayToFE },
  })
  async delete(req: Request, res: Response, __: NextFunction) {
    res.json(await userService.delete(req.body));
  }

  @RequestPropsHandle({ transform: { out: transformDBUserArrayToFE } })
  async getAll(_: Request, res: Response, __: NextFunction) {
    res.json(await userService.getAll());
  }
}

export const userController = new UserController();
