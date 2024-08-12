import { signToken } from './token-auth.js';

export const cookieSender = (req, res) => {
  const payload = res.locals.user || null;
  const signedToken = signToken(payload);

  return res.cookie('userToken', signedToken, { sameSite: 'strict' }).json(res.locals.response?.data);
};
