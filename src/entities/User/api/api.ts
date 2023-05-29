import bcrypt from 'bcrypt';

import { tokenService } from '~/entities/Token/index.js';

import { AccessLevel } from '~/shared/const/index.js';
import { ApiError } from '~/shared/lib/ApiError/index.js';

import { userModel, UserDto, TUserDto } from '../model/index.js';

class UserService {
  async registration(email: string, password: string) {
    if (await userModel.findOne({ email })) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const userDto = new UserDto(
      (await userModel.create({
        email,
        password: await bcrypt.hash(password, 3),
        accessLevel: AccessLevel.User,
      })) as TUserDto
    );
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });

    if (!user) throw ApiError.BadRequest('Пользователь с таким email не найден');

    if (!(await bcrypt.compare(password, user.password))) throw ApiError.BadRequest('Неверный пароль');

    const userDto = new UserDto(user as TUserDto);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    return tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

    const userDto = new UserDto((await userModel.findById((userData as { id: string }).id)) as TUserDto);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAll() {
    return userModel.find().then(r => r.map(({ email, accessLevel }) => ({ email, accessLevel })));
  }
}

export const userService = new UserService();
