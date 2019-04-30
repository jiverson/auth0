export enum Env {
  GRAPH = 0,
  PROD
}

export const ENV_TYPES = [Env.GRAPH, Env.PROD];

export const ALL_QUOTES_APIS = {
  [Env.GRAPH]: "http://localhost:4000/graphql",
  [Env.PROD]: "https://auth0-exercise-quotes-api.herokuapp.com/api/quotes"
};
