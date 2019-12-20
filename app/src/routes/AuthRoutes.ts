export let Auth = {
    "/signin": {"method": ["POST"], "action": "signIn", "auth": 0},
    "/signup": {"method": ["POST"], "action": "signup", "auth": 0},
    "/checkEmail":{"method": ["GET"], "action": "checkEmail", "auth": 0},
    '/activateUser/:userToken': {"method": ["GET"], "action": "activateUser", "auth": 0}
};
