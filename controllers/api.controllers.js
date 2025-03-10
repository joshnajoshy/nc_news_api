const endpoints = require('../endpoints.json')

const getAllEndpoints = (request, response) => {
    response.status(200).send({endpoints})
}

module.exports = getAllEndpoints;