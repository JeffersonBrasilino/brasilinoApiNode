import { LoginActions } from './Login/LoginActions';
import { loginRoutes } from './Login/LoginRoutes';
let mainExports = {
    "Login": {
        "routes": loginRoutes,
        "actions":LoginActions
    }
}

export default mainExports;