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
            let url = req.path.split('/');
            url.splice(0, 1);

            let mainRoute = url[0].charAt(0).toUpperCase() + url[0].slice(1);
            let configRoute;
            url.splice(0, 1); //retira o primeiro item do array, pois ele e o arquivo de origem das rotas
            let subRoute = this.normalizeRoute(url, routes[mainRoute]);
            if (!routes[mainRoute] || !subRoute) {
                codeError = 404;
            } else {
                configRoute = routes[mainRoute][subRoute];
                if (!configRoute.method.find(k => k == req.method)) {
                    res.append('Allow', configRoute.method.join());
                    codeError = 405;
                }
            }

            if (codeError == 0) {
                let method = req.method.toLowerCase();
                let actionName = mainRoute + 'Actions';
                let action = actions[actionName];

                if (!configRoute.auth)
                    this.openRouter[method]('/' + mainRoute + subRoute, new action()[configRoute.action]);
                else
                    this.authRouter[method]('/' + subRoute + subRoute, new action()[configRoute.action]);

            }
        } catch (err) {
            console.log(err);
            codeError = 500;
        }

        if (codeError != 0)
            res.sendStatus(codeError).end();
        else
            next();
    };

    //função para ajustar as rotas com parametros;
    private normalizeRoute = (urlActive, routes) => {

        if (routes && routes instanceof Array == false)
            routes = Object.keys(routes);
        else
            routes = [];

        let urlStr = '/' + urlActive.join('/');
        let finalRoute;
        if (routes.indexOf(urlStr) == -1) {//caso não exista a rota igual
            let newRoute = <any>[];
            let proxRoute = true;
            for (let route of routes) {
                if (proxRoute == true) {
                    proxRoute = false;
                    let rt = route.split('/');
                    rt.splice(0, 1);//deleta a barra inicial das rotas;
                    for (let uriKey in urlActive) {
                        if (
                            (rt[uriKey]) &&
                            (
                                (rt[uriKey] == urlActive[uriKey]) ||
                                (rt[uriKey].search(/:/g) == 0)
                            )
                        ) {
                            newRoute.push(rt[uriKey]);
                        } else {
                            newRoute = [];
                            proxRoute = true;
                        }
                    }

                }
            }
            finalRoute = '/' + newRoute.join('/');
            if (routes.indexOf(finalRoute) == -1) {//verifica novamente se a rota existe no arquivo de rotas, caso não exista ele pegará uma rota que contem parametros opcionais
                finalRoute = finalRoute.replace('/', '');
                let rg = "(^\\/" + finalRoute + ")(\\/:\\w+\\?)+$";
                finalRoute = routes.find(value => new RegExp(rg, 'g').test(value));
            }
        } else {
            finalRoute = urlStr;
        }
        return finalRoute;
    }
}

export default new ProcessRoute();
