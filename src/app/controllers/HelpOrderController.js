import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const { student_id } = req.params;
    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
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
    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res.status(404).json({ error: 'Order does not exist' });
    }

    await helpOrder.update(req.body);

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
