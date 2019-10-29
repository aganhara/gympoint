import * as Yup from 'yup';
import StudentRegistration from '../models/StudentRegistration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class StudentRegistrationController {
  async index(req, res) {
    const studentRegistrations = await StudentRegistration.findAll({
      include: [
        {
          model: Student,
        },
        {
          model: Plan,
        },
      ],
    });
    return res.json(studentRegistrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .min(1)
        .required(),
      plan_id: Yup.number()
        .min(1)
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const studentRegistration = await StudentRegistration.create(req.body);
    return res.json(studentRegistration);
  }

  async update(req, res) {
    const { student_id } = req.params;
    const schema = Yup.object().shape({
      plan_id: Yup.number()
        .min(1)
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const existentStudentRegistration = await StudentRegistration.findOne({
      where: {
        student_id,
      },
    });

    if (!existentStudentRegistration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    const checkPlanExists = await Plan.findByPk(req.body.plan_id);

    if (!checkPlanExists) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const studentRegistration = await existentStudentRegistration.update(
      req.body
    );

    return res.json(studentRegistration);
  }

  async destroy(req, res) {
    const removed = await StudentRegistration.destroy({
      where: { student_id: req.params.student_id },
    });

    if (!removed) {
      return res.status(404).json({ error: 'Student registration not found' });
    }

    return res.json();
  }
}

export default new StudentRegistrationController();
