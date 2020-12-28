const axios = require('axios');

const EXPLOER_API_URL = "https://api.algoexplorer.io/v1";
const getHistoryBalance = function(accountId, days, callback) {
    axios.get(`${EXPLOER_API_URL}/account/${accountId}/balances/history/day/samples/${days}`).then(
        (result) => {
          callback(result.data);
        },
        (error) => {
          callback(null, error);
        }
    )
}

module.exports = {
    getHistoryBalance
}

// let date = new Date(1607724868 * 1000);
// let year = date.getFullYear();
// let month = date.getMonth() + 1;
// let day = date.getDate();
// let formatted = `${year}-${month}-${day}`;
// console.log(formatted);

// getHistoryBalance("6RHERAEOZSULXVK3GLNE32QYJBKJTO4YE3D2GPCVUF5IRK2R6EBCA3INDU", 10, (res) => console.log(res))