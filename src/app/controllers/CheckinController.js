import { startOfDay, endOfDay, isAfter } from 'date-fns';
import Student from '../models/Student';
import Checkin from '../models/Checkin';
import StudentRegistration from '../models/StudentRegistration';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;

    const checkStudent = await Student.findByPk(student_id);

    if (!checkStudent) {
      return res.status(404).json({ error: 'Student does not exist' });
    }

    const { end_date } = await StudentRegistration.findOne({
      where: {
        student_id,
      },
    });

    const today = startOfDay(new Date());

    if (isAfter(today, endOfDay(end_date))) {
      return res.status(401).json({ error: 'Registration expired' });
    }

    try {
      await Checkin.create({ student_id });
      return res.json();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async index(req, res) {
    const { student_id } = req.params;
    const checkStudent = await Student.findByPk(student_id);

    if (!checkStudent) {
      return res.status(404).json({ error: 'Student does not exist' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
      attributes: ['student_id', 'created_at'],
    });
    return res.json(checkins);
  }
}

export default new CheckinController();
