import app from './app';

require('dotenv').config();

app.listen(process.env.SERVER_PORT || 3000);
