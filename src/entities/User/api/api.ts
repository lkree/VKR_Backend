import bcrypt from 'bcrypt';

import { tokenService } from '~/entities/Token/index.js';
import { User } from '~/entities/User/index.js';

import { ApiError } from '~/shared/lib/ApiError/index.js';
import { isObject } from '~/shared/lib/helpers/index.js';

import { DEFAULT_CREATE_USER_LEVER } from '../const/index.js';
import { computeUserForFE } from '../lib/helpers/index.js';
import { userModel } from '../model/index.js';

class UserService {
  async registration(email: string, password: string) {
    if (await userModel.findOne({ email })) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const user = await userModel.create({
      email,
      password: await bcrypt.hash(password, 3),
      accessLevel: DEFAULT_CREATE_USER_LEVER,
    });
    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user: computeUserForFE(user) };
  }

  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });

    if (!user) throw ApiError.BadRequest('Пользователь с таким email не найден');

    if (!(await bcrypt.compare(password, user.password))) throw ApiError.BadRequest('Неверный пароль');

    const tokens = tokenService.generateTokens({ ...user });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user: computeUserForFE(user) };
  }

  async logout(refreshToken: string) {
    return tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb || !isObject(userData)) throw ApiError.UnauthorizedError();

    const user = await userModel.findById(userData._id);

    if (!user) throw ApiError.UnauthorizedError();

    const tokens = tokenService.generateTokens(user);

    await tokenService.saveToken(userData._id, tokens.refreshToken);

    return { ...tokens, user: computeUserForFE(user) };
  }

  async update({ emailForMailings, email }: Pick<User, 'emailForMailings' | 'email'>) {
    await userModel.updateOne({ email }, { email, emailForMailings });
  }

  async getAll() {
    return userModel.find().then(r => r.map(({ email, accessLevel }) => ({ email, accessLevel })));
  }
}

export const userService = new UserService();
