import Sequelize from 'sequelize';
import { TableSchemaDefinition } from '../../database/databaseTypes';

export const greyhoundSchema: TableSchemaDefinition = {
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

export default greyhoundSchema;
