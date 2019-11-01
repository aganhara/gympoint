import Mail from '../../lib/Mail';

class HelpOrderAnsweredMail {
  get key() {
    return 'HelpOrderAnsweredMail';
  }

  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.student} <${data.email}>`,
      subject: 'Sua resposta foi publicada!',
      template: 'help_order_answered',
      context: data,
    });
  }
}

export default new HelpOrderAnsweredMail();
