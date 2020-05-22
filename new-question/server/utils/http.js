const config = require('../config')
const axios = require('axios')
const instance = axios.create({
    baseURL: config.apiUrl,
    timeout: 4000,
    headers: {
        'X-APICloud-AppId': config.myId,
        'X-APICloud-AppKey': config.appKey
    }
});

module.exports = instance