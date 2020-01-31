import { Flask } from "./flask.mjs";

var app = new Flask('app')

app.route('/',  function index(request ){

    return ['root', 200];

} )

app.route('/home',  function home(request){

    return '<html><head> <title> welcome to home </title> </head> <body> <h2> HEllo from the header 2 </h2> </html>';

} )


app.run()