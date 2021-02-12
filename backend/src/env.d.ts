declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_DB_CONNECT: string;
    JWT_STRATEGY: string;
    LIQUOR_PRICE_CHANGER_USERNAME: string;
    PORT: string;
  }
}
