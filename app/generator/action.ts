import { writeFileSync, appendFileSync, existsSync } from 'fs';
class GeneratorAction {
    constructor(args) {
        let actionName = args[2].charAt(0).toUpperCase() + args[2].slice(1);
        if(!existsSync('./src/actions/'+actionName+'Actions.ts')){
             this.createAction(actionName);
             this.createRoutes(actionName);
        }else{
            console.log('action ja existe.');
        }
    }
     createAction = (name) => {
        console.log('gerando actions...');
        let actionName = name + "Actions";

        let modelStr = "export class " + actionName + '{\r\n index = (req, res)=>{res.send("' + actionName + '")}\r\n}';

        writeFileSync('./src/actions/' + actionName + '.ts', modelStr);
        this.registerAction(actionName);
    }

    registerAction = (actionName)=>{
        appendFileSync('./src/actions/ExportActions.ts','\r\nexport {'+actionName+'} from "./'+actionName+'";');
    }

    createRoutes = (name) =>{
        console.log('gerando rotas...');
        let actionName = name + "Routes";
        let routeStr = "export let " + name + ' = {\r\n "":{"method":["GET"],"action":"index","auth":0}\r\n}';
        writeFileSync('./src/routes/' + actionName + '.ts', routeStr);
        this.registerRoutes(name);
    }

    registerRoutes = (routesName)=>{
        appendFileSync('./src/routes/ExportRoutes.ts','\r\nexport {'+routesName+'} from "./'+routesName+'Routes";');
    }
}

new GeneratorAction(process.argv);