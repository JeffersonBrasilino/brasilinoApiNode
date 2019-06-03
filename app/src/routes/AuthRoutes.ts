export let Auth = {
    "/signin": { "method": ["GET"], "action": "index", "auth": 1 },
    "/signup":{"method":["GET","PUT","POST"],"action":"signup","auth":1}
}