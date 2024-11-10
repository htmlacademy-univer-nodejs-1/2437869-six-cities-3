import {inject, injectable} from 'inversify';
import { ConfigInterface } from '../shared/config/config.interface.js';
import { RestSchema } from '../shared/config/rest.schema.js';
import { LoggerInterface } from '../shared/logger/logger.interface.js';
import { AppComponent } from '../shared/types/app-component.enum.js';
import { getMongoURI } from '../shared/helpers/db.js';
import { DatabaseClientInterface } from '../shared/database-client/databace-client.interface.js';


@injectable()
export default class Application {
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
              @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
              @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface) {
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

  public async init() {
    this.logger.info('Application init');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info('Init database');
    await this._initDb();
    this.logger.info('Init database completed');
  }
}
