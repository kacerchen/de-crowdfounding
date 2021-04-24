const axios = require('axios');

// const EXPLOER_API_URL = "https://api.algoexplorer.io/idx2/v2";
const PROXY_URL = "http://localhost:8010/proxy";
const getAllAssets = function(callback) {
    axios.get(`${PROXY_URL}/asset/list`).then(
        (result) => {
          let arr = result.data['contents'].filter((asset) => {
            return typeof(asset['assetId']) != 'undefined';
          });
          callback(arr);
        },
        (error) => {
          callback(null, error);
        }
    )
}

module.exports = {
    getAllAssets
}

// getAllAssets((res) => {
//   // let arr = res['assets'].filter((asset) => {
//   //   return typeof(asset['params']['unit-name']) != 'undefined';
//   // });

//   res.forEach((asset) => {
//     // console.log(typeof(asset['params']['unit-name']) == 'undefined');
//     console.log(asset['params']['unit-name']);
    
//   })
// });