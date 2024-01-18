import { ethers } from "hardhat";

async function main() {
    console.log("\n\n");
    const [deployer, signer1, signer2, signer3] = await ethers.getSigners();



    console.log(`---- deploy the insecureNaiveBank and attack contracts ----`);
    const vaultFactory = await ethers.getContractFactory("InsecureEtherVault");
    const vault = await vaultFactory.deploy();
    const vaultAddress = await vault.getAddress();
    console.log(`vault.address :  ${vaultAddress}`);
    const attackFactory = await ethers.getContractFactory("Attack");
    const attack = await attackFactory.deploy(vault.target);
    const attackAddress = await attack.getAddress();
    console.log(`attack.address :  ${attackAddress}`)
    console.log("\n\n");



    console.log("---- user1 and user2 deposit 3 and 2 ethers respectively ----");
    const depositAmount = ethers.parseEther("1.0");
    await vault.connect(signer1).deposit({ value: depositAmount+depositAmount+depositAmount });
    await vault.connect(signer2).deposit({ value: depositAmount+depositAmount });
    console.log("vault.getUserBalance(user1) : ", await vault.getUserBalance(signer1.address));
    console.log("vault.getUserBalance(user2) : ", await vault.getUserBalance(signer2.address));
    console.log("\n\n");

    console.log("---- before attack ----");
    console.log(`vault.getEtherBalance() : ${await vault.getEtherBalance()}`);
    console.log("vault.getUserBalance(attack) : ", await vault.getUserBalance(await attack.getAddress()))
    console.log("\n\n");
    
    
    console.log("---- perform the attack ----")
    await attack.attack();
    console.log("\n\n");


    
    console.log("---- after attack ----")
    console.log(`attack.getEtherBalance() : ${await attack.getEtherBalance()}`);
    console.log(`vault.getEtherBalance() : ${await vault.getEtherBalance()}`);
    console.log("vault.getUserBalance(attack) : ", await vault.getUserBalance(await attack.getAddress()))




}



main()

