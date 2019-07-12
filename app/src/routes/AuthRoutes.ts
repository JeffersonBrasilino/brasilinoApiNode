export let Auth = {
    "/signin": {"method": ["POST"], "action": "signIn", "auth": 0},
    "/signup": {"method": ["POST"], "action": "signup", "auth": 1},
    "/teste/:param2": {"method": ["POST"], "action": "signup", "auth": 0}
}