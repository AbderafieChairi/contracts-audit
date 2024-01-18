import hre from "hardhat";
import "@nomiclabs/hardhat-ethers"
async function main() {
    const deployedContract = await hre.ethers.deployContract("SimpleVault");
    await deployedContract.waitForDeployment();
    console.log(
        `Counter contract deployed to http://localhost:10002/address/${deployedContract.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


