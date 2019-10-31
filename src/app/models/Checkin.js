import Sequelize, { Model, Op } from 'sequelize';
import { subDays, startOfDay, endOfDay } from 'date-fns';

const maxWeeklyCheckins = 7;

class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    this.addHook('beforeValidate', async checkin => {
      const finalDate = new Date();
      const initialDate = subDays(finalDate, 7);
      const checkins = await Checkin.count({
        where: {
          student_id: checkin.student_id,
          created_at: {
            [Op.between]: [startOfDay(initialDate), endOfDay(finalDate)],
          },
        },
      });

      if (checkins === maxWeeklyCheckins) {
        throw new Error('weekly checkin number exceeded');
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}

export default Checkin;
