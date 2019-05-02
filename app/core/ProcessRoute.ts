import express from "express";
import mainExports from '../src/app/ExportModules';

class ProcessRoute {
    public router;
    public openRoutes;
    constructor() {
        this.router = express.Router();
        this.router.use(this.processRoute);
    }

    processRoute = (req, res, next) => {
        let url = req.url.split('/').filter((el)=>{return el});
         let mainRoute = url[0];
         if (mainExports[mainRoute]) {
             let subRoute = '';
             if(url.length > 1){
                 url.splice(0,1);
                 subRoute = '/'+url.join('/');
             }
             let configRoute = mainExports[mainRoute].routes[subRoute];
             let actions = mainExports[mainRoute].actions
             this.router[configRoute.method]('/'+mainRoute+subRoute,new actions()[configRoute.action]);
         } else {
             res.status(404).json({'success': false, 'error':404});
         }
        next();
    };
}
export default new ProcessRoute().router
