class HTTPError extends Error {
    codeText = {
        401: "Unauthorized",
        400: "Bad request"
    }
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = this.codeText[this.code] + ": " + this.message;
    }
}

module.exports.HTTPError = HTTPError;