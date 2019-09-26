const express = require('express');
const app = express();

let middleware = require(__dirname + "/middleware.js")


// Middleware will only apply to a
// The second parameter for middleware can be an array of middlewares.
app.get('/a', middleware.middleware, (req,res,next)=>{
    //res.send("ROUTE a " + (res.locals.message || "no message"));
    //next('route')
    
    let error = new Error("Something isn't quite right here.")
    // When we pass an error to next, Express will skip all remaning middleware and will go to the first error handler middleware.
    next(error)
});

// Middleware will apply to all routes after this point
//app.use(middleware)

app.get('/b', (req,res)=>{
    res.send("ROUTE b " + (res.locals.message || "no message"));
});

app.get('/:c', (req,res)=>{
    res.send("ROUTE c " + req.params.c  + " " + (res.locals.message || "no message"));
});


// Express considers any middleware with 4 parameters to be an error handler.
let errorHandler = (error, req, res, next) => {
    res.send("There's been an Error: " + error.message)
    // res.send() will terminate the request/response cycle. Hence, next is not necessary.
}

app.use(errorHandler)

const server = app.listen(8080, ()=>{console.log('listneing')});