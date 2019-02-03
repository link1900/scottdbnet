import Sequelize from 'sequelize';

export default {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  name: { type: Sequelize.STRING, unique: true },
  sireId: { type: Sequelize.UUID },
  damId: { type: Sequelize.UUID },
  color: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  dateOfBirth: { type: Sequelize.DATE }
};
