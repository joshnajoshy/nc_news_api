
const handlePsqlError = (error, request, response, next) => {
if(error.code === '22P02'){
    response.status(400).send({msg: 'bad request'})
}
next(error)
}

const handleCustomErrors = (error, request, response, next) => {
    if(error.status){
        response.status(error.status).send({msg: error.msg})
    }  
    next(error)
}

const handleServerErrors = (error, request, response, next) => {
    response.status(500).send({msg: 'internal server error'})
}

module.exports = {handleServerErrors, handlePsqlError, handleCustomErrors}