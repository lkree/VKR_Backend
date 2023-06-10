import bcrypt from 'bcrypt';

import { tokenService } from '~/entities/Token';

import { ApiError } from '~/shared/lib/ApiError';
import { isObject } from '~/shared/lib/helpers';

import { transformDBUserToTokenData, computeDataForUserCreation } from '../lib/helpers';
import { userModel } from '../model';
import type { DBUser } from '../types';

type RegistrationData = Omit<DBUser, 'accessLevel'>;

class UserService {
  async registration({ password, email, cityBounding }: RegistrationData) {
    if (await userModel.findOne({ email })) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const user = await userModel.create(await computeDataForUserCreation({ email, password, cityBounding }));
    const tokens = tokenService.generateTokens(transformDBUserToTokenData(user));
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, ...user };
  }

  async login({ password, email }: Pick<DBUser, 'email' | 'password'>) {
    const user = await userModel.findOne({ email });

    if (!user) throw ApiError.BadRequest('Пользователь с таким email не найден');

    if (!(await bcrypt.compare(password, user.password))) throw ApiError.BadRequest('Неверный пароль');

    const tokens = tokenService.generateTokens(transformDBUserToTokenData(user));

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, ...user };
  }

  async logout(refreshToken: string) {
    return tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb || !isObject(userData)) throw ApiError.UnauthorizedError();

    const user = await userModel.findById(userData._id);

    if (!user) throw ApiError.UnauthorizedError();

    const tokens = tokenService.generateTokens(transformDBUserToTokenData(user));

    await tokenService.saveToken(userData._id, tokens.refreshToken);

    return { ...tokens, ...user };
  }

  async update(userData: RegistrationData) {
    return userModel.updateOne({ email: userData.email }, await computeDataForUserCreation(userData));
  }

  async delete(userData: Pick<DBUser, 'email'>) {
    await userModel.deleteOne(userData);

    return true;
  }

  getAll() {
    return userModel.find();
  }

  _getUserInfo(userData: Pick<DBUser, 'email'>) {
    return userModel.findOne(userData);
  }
}

export const userService = new UserService();
