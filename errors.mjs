
export class HttpError{
    static error404(req, res){
        res.writeHead(404).end("Error 404: Resource not found.");
        return res;
    }
    static error500(req, res){
        res.writeHead(500, "Error 500: Server side error");
        return res;
    }
}

export class InvalidUrlPattern extends Error{
    constructor(message){
        super(message)
        this.name = this.constructor.name;
    }
}

export class ReturnTypeMustBeString extends Error{
    constructor(message){
        super(message)
        this.name = this.constructor.name;
    }

}