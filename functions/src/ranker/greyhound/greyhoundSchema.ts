import Sequelize, { Instance } from 'sequelize';
import { BaseAttributes, TableSchemaDefinition } from '../../database/databaseTypes';

export interface GreyhoundAttributes extends BaseAttributes {
  name: string;
  sireId: string;
  damId: string;
  color: string;
  gender: string;
  dateOfBirth: Date;
}

export const greyhoundSchema: TableSchemaDefinition<Instance<GreyhoundAttributes>> = {
  name: 'greyhound',
  fields: {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    name: { type: Sequelize.STRING },
    sireId: { type: Sequelize.UUID },
    damId: { type: Sequelize.UUID },
    color: { type: Sequelize.STRING },
    gender: { type: Sequelize.STRING },
    dateOfBirth: { type: Sequelize.DATE }
  },
  options: {
    indexes: [
      {
        fields: ['name']
      }
    ]
  }
};
