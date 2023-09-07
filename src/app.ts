import express from 'express';
import { router } from '../src/Routes/router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "../swagger.json";

export class App {
  public server: express.Application;

  constructor() {
      this.server = express();
      this.middleware();
      this.docs();
      this.router();
  }

  private middleware() {
      this.server.use(express.json());
  }

  private docs(){
      this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private router() {
      this.server.use(router);
  }

  public listen(port: number, callback: () => void): void {
      this.server.listen(port, callback);
  }
}