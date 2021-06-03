import express, { Application, NextFunction, Request, Response, Router } from 'express';
import config from '@/resources/application';
import { log } from '@/config/logConifg';

const router: Router = Router();
const server: Application = express();

// 注册初始路由
server.use(config.server.contextPath, router);
// err handler
server.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  return res.sendStatus(500);
});
// launch server
server.listen(config.server.port, function () {
  log.info('start the server at port %o, env=%o', config.server.port, process.env.NODE_ENV);
});
// 动态注册路由
require('@/controller/index');

export { router };