import express from 'express';
import config from "config";

const app = express();

//JSON middleware
app.use(express.json());

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "../swagger.json";

app.use('/agrosistec', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Porta do app
const port = config.get<number>("port");

// Rotas
import router from "./Routes/router";

app.use("/", router);

import mongoose, { Mongoose } from 'mongoose';
const dbUri = config.get<string>('dbUri');
//console.log(dbUri);


  
async function conect() {
  try {
    await mongoose.connect(dbUri);
    console.log(`Project running in port ${port}: http://localhost:${port}/agrosistec`);
  } catch (e) {
    console.log("Connection unnavaliable to the DB!")
    console.log(`Erro: ${e}`)
  }
}

app.listen(port, () => { 
  conect()
})