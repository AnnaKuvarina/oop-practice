import * as express from 'express';
import { Request, Response } from 'express';
import IBurger from './burgers.interface';
import IControllerBase from 'interfaces/IControllerBase.interface';
import * as menu from '../../mocks/burgers-mock.json';

class BurgersController implements IControllerBase {
  public path = '/burgers';
  public router = express.Router();

  private burgersList: IBurger[] = menu;

  constructor() {
    this.initRoutes();
  }

  public initUserLogs() {
  }

  public initRoutes() {
    this.router.get(this.path + '/:id', this.getBurger);
    this.router.get(this.path, this.getAllBurgers);
    this.router.post(this.path, this.buyBurger);
  }

  getBurger = (req: Request, res: Response) => {
    const id = +req.params.id;
    let result = this.burgersList.find(burger => burger.id == id);

    if (!result) {
      res.status(404).send({
        'error': 'Not found!'
      });
    }

    res.render('burger/index', { burger: result });
  }

  getAllBurgers = (req: Request, res: Response) => {
    res.send(this.burgersList);
  }

  buyBurger = (req: Request, res: Response) => {
    const burger: IBurger = req.body;
    this.burgersList.push(burger);
    res.send(this.burgersList);
  }
}

export default BurgersController
