const errorHandelar = (error, res, req, next) => {
    res.send(error.message)
}

module.exports = errorHandelar