import { Flask } from "./flask.mjs";

var app = new Flask('app')
app.route('/',  function index(req, res ){
    res.writeHead(200);
    res.end('hi');
    return res;

} )

// console.log(app._routes['/'] )
app.run()