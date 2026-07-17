const AppError = require("../errors/AppError.js")

class NotFoundError extends AppError{

    constructor(message){
        super(message,404)

    }
}

module.exports = NotFoundError