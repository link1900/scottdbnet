import { DefineModelAttributes, Options, DefineOptions } from 'sequelize';

export type TableSchemaDefinition = {
  fields: DefineModelAttributes<any>;
  options: DefineOptions<any>;
};

export type DatabaseSchemaDefinition = {
  [key: string]: TableSchemaDefinition;
};

export type DatabaseConnection = {
  database: string;
  username: string;
  password: string;
  options: Options;
};
