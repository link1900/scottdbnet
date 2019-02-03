import { DefineModelAttributes, Options } from 'sequelize';

export type DatabaseSchemaDefinition = {
  [key: string]: DefineModelAttributes<any>;
};

export type DatabaseConnection = {
  database: string;
  username: string;
  password: string;
  options: Options;
};
