import { RequestParamHandler } from 'express-serve-static-core';

import { tokenService } from '~/entities/Token/index.js';
import { userService } from '~/entities/User/index.js';

interface IUserController {
  registration: RequestParamHandler;
  login: RequestParamHandler;
  logout: RequestParamHandler;
  refresh: RequestParamHandler;
  getUsers: RequestParamHandler;
  session: RequestParamHandler;
}

const cookieParameters = { maxAge: 10 * 365 * 24 * 60 * 60 * 1000, httpOnly: true };

export const userController: IUserController = {
  registration: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, cookieParameters);
      res.cookie('accessToken', userData.accessToken, cookieParameters);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  },

  session: (req, res, next) => {
    try {
      const { accessToken } = req.cookies;

      return res.json(tokenService.validateAccessToken(accessToken));
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);

      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');

      return res.json(token);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  },

  getUsers: async (_, res, next) => {
    try {
      const users = await userService.getAllUsers();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  },
};
