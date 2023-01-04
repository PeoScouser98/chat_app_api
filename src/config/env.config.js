import "dotenv/config";

const isProductionEnv = process.env.NODE_ENV.toLowerCase().localeCompare("production") >= 0;

export const databaseURI = isProductionEnv ? process.env.DB_URI : process.env.DB_LOCAL_URI;
export const clientURL = isProductionEnv ? process.env.CLIENT_URL : process.env.LOCAL_CLIENT_URL;
