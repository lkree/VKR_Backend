import bcrypt from 'bcrypt';

import { Tokens } from '~/entities/Token';

import { ApiError } from '~/shared/lib/ApiError';
import { checkEmailValidity, isString } from '~/shared/lib/helpers';

import { DEFAULT_CREATE_USER_LEVER } from '../../const';
import type { DBUser, FEUser } from '../../types';

export const assertEmail = (email: string) => {
  if (!checkEmailValidity(email)) throw ApiError.BadRequest('email не валиден');
};

export const emailAssertObject = { email: assertEmail };

export const emailPasswordValidationObject = { email: isString, password: isString };
export const refreshTokenValidationObject = { refreshToken: isString };

export const transformDBUserToFE = ({ email, accessLevel, cityBounding }: DBUser): FEUser => ({
  email,
  accessLevel,
  cityBounding,
});

export const transformDBUserToTokenData = transformDBUserToFE;

export const computeDataForUserCreation = async ({
  email,
  password,
  cityBounding = '',
}: Omit<DBUser, 'accessLevel'>): Promise<DBUser> => ({
  email,
  password: await bcrypt.hash(password, 3),
  accessLevel: DEFAULT_CREATE_USER_LEVER,
  cityBounding,
});

export const transformDBUserArrayToFE = (userArray: Array<DBUser>): Array<FEUser> => userArray.map(transformDBUserToFE);

export const transformDBUserAndTokenToFE = (d: DBUser & Tokens) => ({ ...d, ...transformDBUserToFE(d) });
