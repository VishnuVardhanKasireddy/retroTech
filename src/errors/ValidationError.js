const AppError = require("./AppError.js");

class ValidationError extends AppError {

    constructor(message){
        super(message,400)
    }
}

module.exports = ValidationError