import dotenv from "dotenv";

dotenv.config();

export default {
  url: process.env.APP_URL || "http://localhost:8080",
  port: process.env.PORT || 8080,
  environment: process.env.NODE_ENV || "development",

  databaseUrl: {
    production:
      process.env.PRODUCTION_DATABASE_URL ,
    development: process.env.DEVELOPMENT_DATABASE_URL,

    test: process.env.TEST_DATABASE_URL 
  },

  secretKey: process.env.SECRET_KEY,
    
    production: process.env.NODE_ENV === "production",
    development: process.env.NODE_ENV === "development",
    test: process.env.NODE_ENV === "test",
};
