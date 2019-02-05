import { Context } from '../graphql/graphqlSchemaTypes';
import { DataLoaders } from './dataLoaders';

export default class ServerContext implements Context {
  loaders: DataLoaders;

  constructor(loaders: DataLoaders) {
    this.loaders = loaders;
  }
}
