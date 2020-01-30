import { Flask } from "./flask.mjs";

var app = new Flask('app')

app.route('/',  function index(request ){

    return ['root', 404];

} )

app.route('/home',  function index(request){

    return 'welcome to home ';

} )


app.run()