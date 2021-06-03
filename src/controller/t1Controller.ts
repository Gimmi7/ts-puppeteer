import { Request, Response } from 'express';
import { router } from '@/config/expressConfig';
import { log } from '@/config/logConifg';

router.get("/t1", (req: Request, res: Response) => {
  log.info('t1 request.query=%o', req.query);
  return res.send('t1 response ' + new Date().getTime());
})
