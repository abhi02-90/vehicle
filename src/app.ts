import express from "express";
import cors from "cors";
import helmet from "helmet";

import morgan from "morgan";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from "./schema";
import { ruruHTML  } from "ruru/server";

const app = express();

app.use(morgan("common"));

// USE HELMET AND CORS MIDDLEWARES
app.use(
  cors({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

app.use(express.json());


app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.use(
  "/graphql",
  createHandler({
    schema
  })
);

export default app;