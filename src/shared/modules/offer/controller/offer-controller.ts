import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../../controller/base-controller.js';
import { HttpError } from '../../../errors/http-error.js';
import { LoggerInterface } from '../../../logger/logger.interface.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import { HttpMethod } from '../../../types/http-methods.enum.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
        @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController');
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
  }

  public async show(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }
}
