import express from "express";
import * as actions from '../src/actions/ExportActions';
import * as routes from '../src/routes/ExportRoutes';
import AuthenticatorManager from './AuthenticatorManager';

class ProcessRoute {
    public openRouter = express.Router();
    public authRouter = express.Router();
    constructor() {
        this.openRouter.use(this.processRoute);
        this.authRouter.use(new AuthenticatorManager().authenticate, this.processRoute);
    }

    processRoute = (req, res, next) => {
        let codeError = 0;
        try {
            let url = req.path.split('/').filter((el) => { return el });
            let mainRoute = url[0].charAt(0).toUpperCase() + url[0].slice(1);

            let subRoute = '';
            if (url.length > 1) {
                url.splice(0, 1);
                subRoute = '/' + url.join('/');
            }
            let configRoute = routes[mainRoute][subRoute];

            if (!routes[mainRoute] || !configRoute) {
                codeError = 404;
            } else if (!configRoute.method.find(k => k == req.method)) {
                res.append('Allow', configRoute.method.join());
                codeError = 405;
            }

            if (codeError == 0) {
                let method = req.method.toLowerCase();
                let actionName = mainRoute + 'Actions';
                let action = actions[actionName];

                if (!configRoute.auth)
                    this.openRouter[method]('/' + mainRoute + subRoute, new action()[configRoute.action]);
                else
                    this.authRouter[method]('/' + mainRoute + subRoute, new action()[configRoute.action]);

            }
        } catch (err) {
            codeError = 500;
        }

        if (codeError != 0)
            res.status(codeError).end();
        else
            next();
    };
}
export default new ProcessRoute();
