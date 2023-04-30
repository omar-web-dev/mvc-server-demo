// create a middleware
let counter = 0
const viewMiddleware = (req, res, next) => {
    counter++
    console.log(counter)
    next()
}

module.exports = viewMiddleware;