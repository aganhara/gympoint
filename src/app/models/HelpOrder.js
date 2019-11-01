import Sequelize, { Model } from 'sequelize';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        question: Sequelize.TEXT,
        answer: Sequelize.TEXT,
        answer_at: Sequelize.DATE,
      },
      { sequelize }
    );

    this.addHook('beforeUpdate', async helpOrder => {
      if (helpOrder.answer != null && helpOrder.answer_at == null) {
        helpOrder.answer_at = new Date();
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}

export default HelpOrder;
