const axios = require('axios');

const EXPLOER_API_URL = "https://api.algoexplorer.io/idx2/v2";
const getAllAssets = function(callback) {
    axios.get(`${EXPLOER_API_URL}/assets`).then(
        (result) => {
          let arr = result.data['assets'].filter((asset) => {
            return typeof(asset['params']['unit-name']) != 'undefined';
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