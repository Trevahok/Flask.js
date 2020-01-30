import * as http from "http";
import * as url from 'url';

export class Errors{
    static error404(req, res){
        res.writeHead(404).end("Error 404: Resource not found.");
        return res;
    }
    static error500(req, res){
        res.writeHead(500, "Error 500: Server side error").end();
        return res;
    }
}

export class Flask{
    _routes = {} 
    name = 'app'

    constructor(name = 'app' ) {this.name = name;}

    middleware( req , res ){

        console.log( 
            ` 127.0.0.1 - ${req.url} - [${ new Date().toUTCString() }]  - " ${req.method} HTTP ${req.httpVersion} "  \n `
            )

        return [ req, res ];
    }

    router(url , req, res ){
        if( url in this._routes){

            var viewObj =  this._routes[url];
            if( viewObj.methods.includes( req.method) )
                return viewObj.view(req, res);
        }

        return Errors.error404(req, res);
    }
    route( url , view, methods = [ 'GET', 'POST', 'PUT', 'OPTIONS', 'HEAD'] ){

        this._routes[url] = {
            view, methods
        } 
        
    }
    run( port = 5000 , debug = true ){
        var server = http.createServer((req, res)=>{

            [req , res ] = this.middleware( req, res ) ;

            this.router(req.url, req, res);

        });
        server.listen(port);
        console.log( `Running on http://127.0.0.1:${port}/` )

    }
}