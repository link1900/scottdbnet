import { Context } from '../graphql/graphqlSchemaTypes';
import { DataLoaders } from './dataLoaders';
import { User } from './User';
import * as admin from 'firebase-admin';
import { Role } from './Role';
import ForbiddenError from '../error/ForbiddenError';
import DecodedIdToken = admin.auth.DecodedIdToken;

export default class ServerContext implements Context {
  loaders: DataLoaders;
  public user: User | undefined;
  public idToken: string | undefined;
  public decodedIdToken: DecodedIdToken | undefined;
  public roles: Role[];
  constructor(loaders: DataLoaders) {
    this.loaders = loaders;
  }

  public hasRole(role: Role): boolean {
    return this.roles.includes(role);
  }

  public checkForRole(role: Role): boolean {
    if (!this.hasRole(role)) {
      throw new ForbiddenError('You do not have the required role.');
    }
    return true;
  }
}
