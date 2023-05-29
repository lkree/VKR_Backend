import type { NextFunction, Request, Response } from 'express';

import { BaseController, Controller } from '~/shared/lib/BaseController/index.js';

import { leftoverService } from '../api/index.js';
import { dbModelIntoView, getLeftover, getLeftovers } from '../lib/helpers/index.js';
import type { FileLeftovers, Leftovers } from '../types/index.js';

const transformDBIntoView = (leftovers: Promise<Leftovers>) => leftovers.then(d => d.map(dbModelIntoView));

class LeftoverController extends BaseController implements Controller<typeof leftoverService> {
  async add(req: Request, res: Response, __: NextFunction) {
    res.json(await transformDBIntoView(leftoverService.add(getLeftovers(req.body))));
  }

  async writeAll(req: Request, res: Response, __: NextFunction) {
    res.json(await transformDBIntoView(leftoverService.writeAll(getLeftovers(req.body))));
  }

  async update(req: Request, res: Response, __: NextFunction) {
    res.json(await transformDBIntoView(leftoverService.update(getLeftovers(req.body))));
  }

  async deleteOne(req: Request, res: Response, __: NextFunction) {
    res.json(await transformDBIntoView(leftoverService.deleteOne(getLeftover(req.body))));
  }

  async deleteAll(_: Request, res: Response, __: NextFunction) {
    res.json(await transformDBIntoView(leftoverService.deleteAll()));
  }

  async getUniqueProducts(_: Request, res: Response, __: NextFunction) {
    res.json(await leftoverService.getUniqueProducts());
  }

  async getAll(_: Request, res: Response, __: NextFunction) {
    res.json(await transformDBIntoView(leftoverService.getAll()));
  }

  _getAll() {
    return leftoverService.getAll();
  }

  _saveLeftoversFromFile(fileLeftovers: FileLeftovers) {
    return leftoverService._saveLeftoversFromFile(fileLeftovers);
  }
}

export const leftoverController = new LeftoverController();
