import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;
    const student = await Student.findOne({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .min(0)
        .required(),
      weight: Yup.number()
        .min(0)
        .required(),
      height: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const { name, email, age, weight, height } = req.body;

    const existentStudent = await Student.findOne({
      where: {
        name,
        email,
      },
    });

    if (existentStudent) {
      return res.json(existentStudent);
    }

    const student = await Student.create({
      name,
      email,
      age,
      weight,
      height,
    });

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const existentStudent = await Student.findOne({ where: { id } });

    if (!existentStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const [, [student]] = await Student.update(req.body, {
      returning: true,
      where: { id },
    });

    return res.json(student);
  }

  async destroy(req, res) {
    const { id } = req.params;
    await Student.destroy({
      where: {
        id,
      },
    });

    return res.send();
  }
}

export default new StudentController();
