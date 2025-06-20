import express from "express";

import dotenv from "dotenv";
import router from "./router/indexRouter.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use("/",router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening at the port ${PORT}`);
});
