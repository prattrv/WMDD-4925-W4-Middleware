exports.middleware = (req, res, next) => {
    res.locals.message = "Bonjour!"
    // res.locals is an object that contains information associated with this response
    
    next()
    // if we don't do this, the request will hang.
}