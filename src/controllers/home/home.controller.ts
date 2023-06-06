import * as express from 'express';
import { Request, Response } from 'express';
import fetch from 'node-fetch';
import IControllerBase from 'interfaces/IControllerBase.interface';

class HomeController implements IControllerBase {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initUserLogs();
    this.initRoutes();
  }

  public initUserLogs() {
    this.router.use((req, res, next) => {
      if (req.url === '/') {
        console.log('Main page last visited: ', Date.now());
      }
      next();
    })
  }

  public initRoutes() {
    this.router.get('/', this.index);
  }

  index = (req: Request, res: Response) => {
    fetch('http://localhost:8000/burgers')
      .then((response) => response.json())
      .then((burgers) => {
        res.render('home/index', { burgers })
      })
  }
}

export default HomeController;
