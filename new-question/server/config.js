const SHA1 = require('./utils/SHA1')
const apiUrl = 'https://d.apicloud.com/mcm'
const myId = ''; // your id 
const myAppKey = '' // your app key
const now = Date.now();
const appKey = SHA1(myId + "UZ" + myAppKey + "UZ" + now) + "." + now;
module.exports = {
    apiUrl,
    myId,
    appKey
}