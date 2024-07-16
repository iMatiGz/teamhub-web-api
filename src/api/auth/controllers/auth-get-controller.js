import { AuthSearchCases } from '../use-cases/auth-search-cases.js';

export class AuthGetController {
  constructor() {
    this.search = new AuthSearchCases();
  }

  loginUser = async (req, res, next) => {
    const credentials = req.headers.authorization || null;
    if (!credentials) return res.status(400).send('No se enviaron los datos de autenticación.');

    const [email, password] = atob(credentials.split(' ')[1]).split(':');
    const user = await this.search.searchUserByCredentials(email, btoa(password));

    if (user === false) return res.status(500).send('Ocurrió un error inesperado en el servidor.');
    if (user === null) return res.status(401).send('Credenciales incorrectas.');

    res.locals.user = { userId: user.user_id, username: user.email };
    res.locals.response = { data: user };
    res.status(200);
    next();
  };

  checkToken = async (req, res, next) => {
    res.status(204);
    next();
  };
}
