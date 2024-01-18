import hre from "hardhat";
import "@nomiclabs/hardhat-ethers"
async function main() {
    const deployedContract = await hre.ethers.deployContract("VotingSystem");
    await deployedContract.waitForDeployment();
    console.log(
        `Counter contract deployed to http://localhost:10002/address/${deployedContract.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});



// https://explorer.public.zkevm-test.net/address/0x5FbDB2315678afecb367f032d93F642f64180aa3