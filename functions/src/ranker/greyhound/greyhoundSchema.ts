import Sequelize from 'sequelize';
import { TableSchemaDefinition } from '../../database/databaseTypes';

export type GreyhoundModelInstance = {
  id: string;
  name: string;
  sireId: string;
  damId: string;
  color: string;
  gender: string;
  dateOfBirth: Date;
};

export const greyhoundSchema: TableSchemaDefinition<GreyhoundModelInstance> = {
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
