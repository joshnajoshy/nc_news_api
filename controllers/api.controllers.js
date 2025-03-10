const endpoints = require('../endpoints.json');
const fetchAllTopics = require('../models/api.models')

const getAllEndpoints = (request, response) => {
    response.status(200).send({endpoints})
}

const getAllTopics = (request, response) => {
    fetchAllTopics().then((topics) => {
        response.status(200).send({topics})
    })
}

module.exports = {getAllEndpoints, getAllTopics};