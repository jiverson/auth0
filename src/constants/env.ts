export enum Env {
  DEV = 0,
  PROD
}

export const ENV_TYPES = [Env.DEV, Env.PROD];

export const ALL_QUOTES_APIS = {
  [Env.DEV]: "http://localhost:3004/api/quotes",
  [Env.PROD]: "https://auth0-exercise-quotes-api.herokuapp.com/api/quotes"
};
