import jwt from 'jsonwebtoken';
import { DeleteResult } from 'mongodb';

import { tokenModel } from '../model/index.js';

class TokenService {
  generateTokens(payload: Parameters<(typeof jwt)['sign']>[0]) {
    return {
      accessToken: jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '3650days' }),
      refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '3650days' }),
    };
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    return tokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string): Promise<DeleteResult> {
    return tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    return tokenModel.findOne({ refreshToken });
  }
}

export const tokenService = new TokenService();
