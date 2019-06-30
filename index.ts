import {  NextFunction, Request, Response } from 'express';

type EnvrinMentType = 'development' | 'production';

export const log = (environment: EnvrinMentType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(environment === 'production') {
            return next();
        }
        const initTime = Date.now();
        req['myLoggerInit'] = initTime;
        next();
        req.on('end', () => {
            const diff = Date.now() - req['myLoggerInit'];
            console.info({
                path: req.path,
                type: req.method,
                time: diff
            })
        })
    }
}