require('dotenv').config();

export default {
  secret: process.env.AUTH_SECRET,
  options: {
    expiresIn: process.env.AUTH_EXPIRES_IN,
  },
};
