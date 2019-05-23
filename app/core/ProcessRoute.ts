import express from "express";
import * as actions from '../src/actions/ExportActions';
import * as routes from '../src/routes/ExportRoutes';

class ProcessRoute {
    public router;
    public openRoutes;
    constructor() {
        this.router = express.Router();
        this.router.use(this.processRoute);
    }

    processRoute = (req, res, next) => {
        try {
            let url = req.url.split('/').filter((el) => { return el });
            let mainRoute = url[0].charAt(0).toUpperCase() + url[0].slice(1);
            if (routes[mainRoute]) {
                let subRoute = '';
                if (url.length > 1) {
                    url.splice(0, 1);
                    subRoute = '/' + url.join('/');
                }
                let configRoute = routes[mainRoute][subRoute];
                if (configRoute) {
                    let actionName = mainRoute + 'Actions';
                    let action = actions[actionName];
                    this.router[configRoute.method]('/' + mainRoute + subRoute, new action()[configRoute.action]);
                }else{
                    res.status(404).json({ 'status': 404 });
                }

            } else {
                res.status(404).json({ 'status': 404 });
            }
        } catch (error) {
            res.status(500).json({'status': 500 });
        }

        next();
    };
}
export default new ProcessRoute().router
