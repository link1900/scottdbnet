import { DefineModelAttributes, Options, DefineOptions } from 'sequelize';

export type TableSchemaDefinition<InstanceType> = {
  name: string;
  fields: DefineModelAttributes<any>;
  options: DefineOptions<any>;
};

export type DatabaseConnection = {
  database: string;
  username: string;
  password: string;
  options: Options;
};
