import express, { Request, Response, NextFunction } from "express";
import { graphqlHTTP } from "express-graphql"
import  graphSchema  from "./graphql/schemas"
import graphResolver from "./graphql/resolvers"
import logger from "morgan"
import creatError from "http-errors"
import dotenv from "dotenv"
import { verifyAccessToken } from "./helpers/jwt_helper"


dotenv.config();

import "./helpers/init_mongodb"


const app = express()


app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello And Welcome to My GraphQL API Please Add /graphql to your current url!")
})


app.use(verifyAccessToken)

app.use("/graphql", graphqlHTTP({
    schema: graphSchema,
    rootValue: graphResolver,
    graphiql: true
}))

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new creatError.NotFound("This route does not exit!"));
});

app.use(
  (
    error: { message: string; status: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(error.status || 500);
    res.json({
      status: "error",
      message: error.message,
    });
    next();
  }
);


export default app