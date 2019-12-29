import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import HelpOrderAnsweredMail from '../jobs/HelpOrderAnsweredMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
      include: [
        {
          model: Student,
          attributes: ['name'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const { student_id } = req.params;
    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
      order: [['updated_at', 'desc']],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;

    const helpOrder = await HelpOrder.create({ student_id, ...req.body });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const { id } = req.params;
    const helpOrder = await HelpOrder.findByPk(id, {
      include: [{ model: Student, attributes: ['name', 'email'] }],
    });

    if (!helpOrder) {
      return res.status(404).json({ error: 'Order does not exist' });
    }

    await helpOrder.update(req.body);
    await Queue.add(HelpOrderAnsweredMail.key, {
      student: helpOrder.Student.name,
      email: helpOrder.Student.email,
      question: helpOrder.question,
      answer: helpOrder.answer,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
