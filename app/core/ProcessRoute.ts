import express from "express";
import * as actions from '../src/actions/ExportActions';
import * as routes from '../src/routes/ExportRoutes';
import RouterAuthenticator from './RouterAuthenticator';

class ProcessRoute {
    public openRouter = express.Router();
    public authRouter = express.Router();
    constructor() {
        this.openRouter.use(this.processRoute);
        this.authRouter.use((req, res, next) => new RouterAuthenticator(req, res, next), this.processRoute);
    }

    processRoute = (req, res, next) => {
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
                res.status(404);
            }

            if (configRoute) {
                if (!configRoute.method.find(k => k == req.method))
                    res.status(405).append('Allow', configRoute.method.join());

                if (configRoute) {
                    let method = req.method.toLowerCase();
                    let actionName = mainRoute + 'Actions';
                    let action = actions[actionName];

                    if (!configRoute.auth)
                        this.openRouter[method]('/' + mainRoute + subRoute, new action()[configRoute.action]);
                    else
                        this.authRouter[method]('/' + mainRoute + subRoute, new action()[configRoute.action]);
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'status': 500 });
        }
        next();
    };
}
export default new ProcessRoute();
