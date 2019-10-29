import Sequelize, { Model } from 'sequelize';
import { addMonths } from 'date-fns';
import Plan from './Plan';

class StudentRegistration extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async studentRegistration => {
      const plan = await Plan.findByPk(studentRegistration.plan_id);
      studentRegistration.price = plan.price * plan.duration;
      studentRegistration.end_date = addMonths(
        studentRegistration.start_date,
        plan.duration
      );
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id' });
  }
}

export default StudentRegistration;
