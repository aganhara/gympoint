import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Student from '../models/Student';

import authConfiguration from '../../config/auth';

class StudentSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const { name, email } = student;

    return res.json({
      student: {
        id,
        name,
        email,
      },
      token: jwt.sign(
        { id },
        authConfiguration.secret,
        authConfiguration.options
      ),
    });
  }
}

export default new StudentSessionController();
