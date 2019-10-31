import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import StudentRegistration from '../app/models/StudentRegistration';
import Checkin from '../app/models/Checkin';
import Assistance from '../app/models/Assistance';

import databaseConfig from '../config/database';

const models = [User, Student, Plan, StudentRegistration, Checkin, Assistance];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
