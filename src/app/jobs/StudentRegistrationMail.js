import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class StudentRegistrationMail {
  get key() {
    return 'StudentRegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    const student = registration.Student;
    const plan = registration.Plan;
    const numberFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const context = {
      student: student.name,
      plan: plan.title,
      duration: plan.duration,
      price: numberFormat.format(plan.price),
      end_date: format(parseISO(registration.end_date), 'dd/MM/yyyy'),
    };

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Registro realizado com sucesso.',
      template: 'student_registration',
      context,
    });
  }
}

export default new StudentRegistrationMail();
