const handleServerErrors = (error, request, response, next) => {
    response.status(error.status).send({msg: 'internal server error'})
}

module.exports = handleServerErrors