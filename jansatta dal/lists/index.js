import { User } from './user';
import { Martyr } from './martyr';
import { ForgottenPasswordToken, ForgottenPasswordSchema } from './forgottenPasswordToken';

export const createList = keystone => {
  keystone.createList('ForgottenPasswordToken', ForgottenPasswordToken);
  keystone.createList('User', User);
  keystone.createList('Martyr', Martyr);

  keystone.extendGraphQLSchema(ForgottenPasswordSchema);
};
