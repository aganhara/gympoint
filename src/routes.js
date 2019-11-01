import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import StudentRegistrationController from './app/controllers/StudentRegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.send('Hello World!'));

routes.post('/login', SessionController.store);

routes.get('/students/:student_id/checkin', CheckinController.index);
routes.post('/students/:student_id/checkin', CheckinController.store);

routes.get('/students/:student_id/help-orders', HelpOrderController.show);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.use(authMiddleware); // All routes below this line will only call if the user is authenticated.

routes.put('/help-orders/:id/answer', HelpOrderController.update);
routes.get('/students/help-orders', HelpOrderController.index);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.destroy);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

routes.get('/registration', StudentRegistrationController.index);
routes.post('/registration', StudentRegistrationController.store);
routes.put('/registration/:student_id', StudentRegistrationController.update);
routes.delete(
  '/registration/:student_id',
  StudentRegistrationController.destroy
);

module.exports = routes;
