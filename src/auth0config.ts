import { ConfigParams } from "express-openid-connect";

export const configAuth0:ConfigParams = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'uFyoCCgNJ26sDlGXyQfYaHX8oOoGu9E3',
    issuerBaseURL: 'https://dev-hxr92yst.us.auth0.com/',
  };
  