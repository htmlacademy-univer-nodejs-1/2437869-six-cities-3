import {inject, injectable} from 'inversify';
import { ConfigInterface } from '../shared/config/config.interface.js';
import { RestSchema } from '../shared/config/rest.schema.js';
import { LoggerInterface } from '../shared/logger/logger.interface.js';
import { AppComponent } from '../shared/types/app-component.enum.js';
import { getMongoURI } from '../shared/helpers/db.js';
import { DatabaseClientInterface } from '../shared/database-client/databace-client.interface.js';
import express, {Express} from 'express';

@injectable()
export default class Application {
  private server: Express;
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
              @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
              @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface) {
    this.server = express();
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application init');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info('Init database');
    await this._initDb();
    this.logger.info('Init database completed');
    this.logger.info('Try to init server');
    await this._initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
