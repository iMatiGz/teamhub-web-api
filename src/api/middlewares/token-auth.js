import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signToken = payload => {
  return jwt.sign(payload, process.env.API_KEY, { expiresIn: '2h' });
};

export const hasSignedToken = (req, res, next) => {
  const token = req.cookies.userToken || null;
  if (!token) return res.status(401).send('No se proporcionó un Token de Usuario.');

  jwt.verify(token, process.env.API_KEY, (err, payload) => {
    if (err) return res.status(401).send('Token de Usuario inválido.');
    res.locals.user = { userId: payload.userId, username: payload.username };
    next();
  });
};
