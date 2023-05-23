import { AccessLevel } from '~/shared/const/index.js';

export interface User {
  email: string;
  password: string;
  accessLevel: AccessLevel;
}
