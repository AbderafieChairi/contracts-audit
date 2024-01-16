require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
solidity: "0.8.9",
paths: {
    artifacts: "./src",
},
networks: {
    // poly: {
    // url: `http://localhost:10002/`,
    // accounts: [process.env.ACCOUNT_PRIVATE_KEY],

    // },
},
};
