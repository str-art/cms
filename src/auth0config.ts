import { ConfigParams } from "express-openid-connect";

export const configAuth0:ConfigParams = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'ouPlVcxklUGtjOzr1Vp3dAfzSdqbKp92',
    issuerBaseURL: 'https://dev-djgb53nn.us.auth0.com',
  };
  