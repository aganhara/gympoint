import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findOne({
      where: { id },
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .min(1)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validations fails' });
    }

    const checkIfExists = await Plan.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (checkIfExists) {
      return res.json(checkIfExists);
    }

    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.json(404).json({ error: 'Plan not found.' });
    }

    const { id, title, duration, price } = await plan.update(req.body);
    return res.json({ id, title, duration, price });
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const removed = await Plan.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!removed) {
      return res.status(404).json({ error: 'Plan does not exist' });
    }

    return res.json();
  }
}

export default new PlanController();
