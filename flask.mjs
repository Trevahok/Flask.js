import * as http from "http";
import * as url from 'url';
import { insertUrl, searchUrl} from "./router.mjs";
import {} from './errors.mjs';
import { HttpError,  InvalidUrlPattern, ReturnTypeMustBeString} from "./errors.mjs";

/*


            +-----------+
            |  run      |
            |           |<---+
            +----+------+    |
                |           |
            +----v------+    |
            | middleware|    |
            +----+------+    |
                |           |
            +----v-------+   |
            | router     |   |
            +----+-------+   |
                |           |
                |           |
                +-----------+


*/


/*

TODO:
 - URL Get params and search params - modify Trie and extract get params in urToPath
 - Serve static files and tempaltes from their respective folders - render_template , return_static 
*/

export class Flask{

    _routes = {} 
    name = 'app'

    constructor(name = 'app', static_folder = './static', template_folder = './templates' ) {
        this.name = name;
        this.routes = {}
        this.static_folder  = static_folder
        this.template_folder = template_folder
    }

    middleware( req , res ){

        
        var response = this.router( req.url , req, res )

        console.log( 
            ` 127.0.0.1 - - [${ new Date().toUTCString() }] - ${response.statusCode} - "${req.method} ${req.url} HTTP ${req.httpVersion}" ${response.statusCode} - `
            )

        return [ req, res ];
    }

    router(url , req, res ){

        var view = searchUrl(url, this._routes)  // Use Trie to search for URL in routes 

        if( view !== null){
            var resp = view(req)
            if (typeof resp === typeof '' )
                var [response , statusCode=200 ] = [resp]   // If return type is string , Submit string as response  
            else if (typeof resp === typeof [] )
                var [response , statusCode=200 ] = resp // If return type is a list, unpack the list 
            else
                throw ReturnTypeMustBeString;   

            switch(statusCode){
                case 404:
                    return HttpError.error404(req, res)
                case 500: 
                    return HttpError.error500(req, res)
                default: 
                    res.end(response)
                    res.writeHead(statusCode)
            }
            return res
        }


        return HttpError.error404(req, res);
    }
    route( url , view, methods = [ 'GET', 'POST', 'PUT', 'OPTIONS', 'HEAD'] ){

        view = view.bind(this)
        this._routes = insertUrl(url, this._routes, view)
        
    }
    run( port = 5000 , debug = true ){
        var server = http.createServer((req, res)=>{

            try{
                res = this.middleware( req, res ) ;

                return res;
            }
            catch( e ){
                console.log( e)
            }
            finally{ 
                return HttpError.error500(req, res)
            }


        });
        server.listen(port);
        console.log( `Running on http://127.0.0.1:${port}/` )

    }

}