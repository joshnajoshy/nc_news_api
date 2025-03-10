const handleServerErrors = (error, request, response, next) => {
    response.status(500).send({msg: 'internal server error'})
}

module.exports = handleServerErrors