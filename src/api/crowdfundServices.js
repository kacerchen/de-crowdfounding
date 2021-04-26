const axios = require('axios');

// run command:  lcp --proxyUrl http://localhost:9000 to start proxy
const URL = "http://localhost:8010/proxy/crowdfund";

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

const addFund = (fund) => {
    console.log("service start...");
    fund.startDate = fund.startDate.unix() * 1000;
    fund.endDate = fund.endDate.unix() * 1000;
    fund.closeOutDate = fund.closeOutDate.unix() * 1000;
    console.log(fund);
    
    return new Promise(async(resolve, reject) => {
        axios.post(`${URL}/fund`, fund, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then((result) => {
            console.log("Add fund success!")
            resolve(result.data.contents);
        })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getFundList = () => {
    return new Promise(async(resolve, reject) => {
        axios.all([
            axios.get(`${URL}/fund`),
            axios.get(`${URL}/investment`)
        ])
        .then(axios.spread((fundList, investmentList) => {
            let funds = fundList.data.contents;
            let investments = investmentList.data.contents;
            funds.forEach((fund) => {
                let investors = [];
                let balance = 0;
                const matches = investments.filter(investment => investment.fundId == fund.id);

                if(matches.length != 0) {
                    matches.map((investment) => {
                        investors.push(
                            { 
                                payid: investment.investorAddress, 
                                amount: investment.investmentAmount 
                            }
                        );

                        balance += investment.investmentAmount;
                    });
                }
                fund['investors'] = investors;
                fund['balance'] = balance; 
            });
            
            console.log(funds);
            resolve(funds);
        }))
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getFundByAccount = (address) => {
    return new Promise(async(resolve, reject) => {
        axios.all([
            axios.get(`${URL}/fund`),
            axios.get(`${URL}/investment`)
        ])
        .then(axios.spread((fundList, investmentList) => {
            let funds = fundList.data.contents;
            let investments = investmentList.data.contents;
            let matched_funds = funds.filter(fund => fund.creatorAddress == address);
            matched_funds.forEach((fund) => {
                let investors = [];
                let balance = 0;
                const matches = investments.filter(investment => investment.fundId == fund.id);

                if(matches.length != 0) {
                    matches.map((investment) => {
                        investors.push(
                            { 
                                payid: investment.investorAddress, 
                                amount: investment.investmentAmount 
                            }
                        );

                        balance += investment.investmentAmount;
                    });
                }
                fund['investors'] = investors;
                fund['balance'] = balance; 
            });
            
            console.log(matched_funds);
            resolve(matched_funds);
        }))
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getFundById = (fundId) => {
    return new Promise(async(resolve, reject) => {
        axios.all([
            axios.get(`${URL}/fund/${fundId}`),
            axios.get(`${URL}/investment`)
        ])
        .then(axios.spread((fundList, investmentList) => {
            let fund = fundList.data;
            let investments = investmentList.data.contents;
            let investors = [];
            let balance = 0;
            console.log(fundList);
            const matches = investments.filter(investment => investment.fundId == fund.id);
            if(matches.length != 0) {
                matches.map((investment) => {
                    investors.push(
                        { 
                            payid: investment.investorAddress, 
                            amount: investment.investmentAmount 
                        }
                    );

                    balance += investment.investmentAmount;
                });
            }
            fund['investors'] = investors;
            fund['balance'] = balance; 
            
            console.log([fund]);
            resolve([fund]);
        }))
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const addInvestment = (investment) => {
    return new Promise(async(resolve, reject) => {
        axios.post(`${URL}/investment`, investment, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then((result) => {
            resolve(result.data.contents);
        })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getInvestmentList = () => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/investment`).then(
            (result) => {
                resolve(result.data.contents);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getInvestmentById = (investmentId) => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/investment/${investmentId}`)
        .then(
            (result) => {
                resolve([result.data]);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getInvestmentByAccount = (address) => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/investment`)
        .then(
            (result) => {
                let all_investments = result.data.contents;
                let matched_investments = all_investments.filter((investment) => investment.investorAddress == address);

                console.log(matched_investments);
                resolve(matched_investments);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const addClaim = (claim) => {
    return new Promise(async(resolve, reject) => {
        axios.post(`${URL}/claim`, claim, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then((result) => {
            resolve(result.data.contents);
        })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getClaimList = () => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/claim`).then(
            (result) => {
                resolve(result.data.contents);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getClaimById = (claimId) => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/claim/${claimId}`).then(
            (result) => {
                resolve([result.data]);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getClaimByAccount = (address) => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/claim`)
        .then(
            (result) => {
                let all_claims = result.data.contents;
                let matched_claims = all_claims.filter((claim) => claim.receiverAddress == address);

                console.log(matched_claims);
                resolve(matched_claims);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const addReclaim = (reclaim) => {
    return new Promise(async(resolve, reject) => {
        axios.post(`${URL}/reclaim`, reclaim, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then((result) => {
            resolve(result.data.contents);
        })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getReclaimList = () => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/reclaim`).then(
            (result) => {
                resolve(result.data.contents);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getReclaimById = (reclaimId) => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/reclaim/${reclaimId}`).then(
            (result) => {
                resolve([result.data]);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getReclaimByAccount = (address) => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/reclaim`)
        .then(
            (result) => {
                let all_reclaims = result.data.contents;
                let matched_reclaims = all_reclaims.filter((reclaim) => reclaim.investorAddress == address);

                console.log(matched_reclaims);
                resolve(matched_reclaims);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const addCloseout = (closeout) => {
    return new Promise(async(resolve, reject) => {
        axios.post(`${URL}/closeout`, closeout, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then((result) => {
            resolve(result.data.contents);
        })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getCloseoutList = () => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/closeout`).then(
            (result) => {
                resolve(result.data.contents);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getCloseoutById = async (closeoutId) => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/closeout/${closeoutId}`).then(
            (result) => {
              resolve([result.data]);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

const getCloseoutByAccount = (address) => {
    return new Promise(async(resolve, reject) => {
        axios.get(`${URL}/closeout`)
        .then(
            (result) => {
                let all_closeouts = result.data.contents;
                let matched_closeouts = all_closeouts.filter((closeout) => closeout.closeoutAddress == address);

                console.log(matched_closeouts);
                resolve(matched_closeouts);
            })
        .catch((error) => {
            reject(`Error: ${error}`);
        });
    });
}

export default {
    addFund,
    getFundList,
    getFundById,
    getFundByAccount,
    addInvestment,
    getInvestmentList,
    getInvestmentById,
    getInvestmentByAccount,
    addClaim,
    getClaimList,
    getClaimById,
    getClaimByAccount,
    addReclaim,
    getReclaimList,
    getReclaimById,
    getReclaimByAccount,
    addCloseout,
    getCloseoutList,
    getCloseoutById,
    getCloseoutByAccount,
}

// let test_fund = {
//     "investors": [],
//     "appId": 10001,
//     "name": "test fund in app",
//     "description": "test fund in app",
//     "startDate": 1613427830337,
//     "endDate": 1613427830337,
//     "closeOutDate": 1613427830337,
//     "goalAmount": 100000,
//     "goalAssetId": 10000,
//     "creatorAddress": "shreya19$pagoservices.com",
//     "receiverAddress": "alice@pago.com"
// };

// addFund(test_fund, (res) => {
//     console.log(res);
// })

// // getFundList((res) => {
// //     /* res obj
// //     {
// //         contents:[{}, {}, ...],
// //         total: 50,
// //         page_number: 0, 
// //         page_size: 100
// //     }
// //     */
// //     console.log(res);
// // })

// // getFundById('11563fb7-8af3-4376-abeb-efdfa7bbb955', (res) => {
// //     console.log(res);
// // })

// let test_investment = {
//     "fundId": "aa97f85c-a2f4-4f08-96a3-0639fdf69d37",
//     "investorAddress": "shreya19$pagoservices.com",
//     "note": "investment in fund aa97f85c-a2f4-4f08-96a3-0639fdf69d37",
//     "investmentAmount": 100
// }

// // addInvestment(test_investment, (res) => {
// //     console.log(res);
// // })

// // getInvestmentList((res) => {
// //     console.log(res);
// // })

// // getInvestmentById('6f4b8aca-d9f3-456c-b802-2e7487d30c45', (res) => {
// //     console.log(res);
// // })

// let test_claim = {
//     "fundId": "bb8b30e7-d42f-44b2-8ea7-6c7efad213ba",
//     "receiverAddress": "shreya19$pagoservices.com",
//     "claimAmount": 150,
//     "receivedAmount": null
// }

// // addClaim(test_claim, (res) => {
// //     console.log(res);
// // })

// // getClaimList((res) => {
// //     console.log(res);
// // })

// // getClaimById('caad0dbc-efed-4a85-b85a-5ec99c8a0a02', (res) => {
// //     console.log(res);
// // })

// let test_reclaim = {
//     "fundId": "a39df890-be51-41d6-9efe-a4d24e80df06",
//     "investorAddress": "shreya19$pagoservices.com",
//     "reclaimAmount": 150
// }

// // addReclaim(test_reclaim, (res) => {
// //     console.log(res);
// // })

// // getReclaimList((res) => {
// //     console.log(res);
// // })

// // getReclaimById('a3bad4fc-4e9d-4900-b300-7617c160dd03', (res) => {
// //     console.log(res);
// // })

// let test_closeout = {
//     "fundId": "bb8b30e7-d42f-44b2-8ea7-6c7efad213ba",
//     "closeoutAddress": "shreya19$pagoservices.com",
//     "closeoutAmount": 100
// }

// // addCloseout(test_closeout, (res) => {
// //     console.log(res);
// // })

// // getCloseoutList((res) => {
// //     console.log(res);
// // })


// async function test() {
//     let res2 = await getCloseoutById('fe1dec0c-5c0b-4596-aa81-7368ec08cc52', (res) => {
//         return res;
//     });
//     console.log(res2);
// }

// // test();

// getFundListWithInvestment((res) => {
//     console.log(res);
// })