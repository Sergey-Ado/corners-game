export enum defaultEnv {
  SERVER_PORT = '3000',
  JWT_SECRET_KEY = '123456',
  SERVER_URL = `http://localhost:${defaultEnv.SERVER_PORT}`,
  FRONTEND_URL = 'http://lockalhost:5173',
}

export enum Endpoints {
  BASE = '/',
  USER = '/api/user',
  REGISTER = '/api/register',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
