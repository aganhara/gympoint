import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;

    const checkStudent = await Student.findByPk(student_id);

    if (!checkStudent) {
      return res.status(404).json({ error: 'Student does not exist' });
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
