import { DefineModelAttributes, Options, DefineOptions, Instance } from 'sequelize';

export interface BaseAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TableSchemaDefinition<InstanceType extends Instance<BaseAttributes>> = {
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
