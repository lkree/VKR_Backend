import { User } from '~/entities/User/types/index.js';

export type TUserDto = {
  _id: unknown;
} & Pick<User, 'email' | 'accessLevel'>;

export class UserDto {
  email;
  id: string;
  accessLevel;

  constructor(model: TUserDto) {
    this.email = model.email;
    this.id = model._id as string;
    this.accessLevel = model.accessLevel;
  }
}
