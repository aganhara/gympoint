import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.send('Hello World!'));

routes.post('/login', SessionController.store);

routes.use(authMiddleware); // All routes below this line will only call if the user is authenticated.

routes.get('/students', (req, res) => {
  return res.json({ success: true });
});

module.exports = routes;
