import { ethers } from "hardhat";

async function main() {
    console.log("\n\n");
    const [deployer, signer1, signer2, signer3] = await ethers.getSigners();



    console.log(`---- deploy the insecureNaiveBank and attack contracts ----`);
    const bankFactory = await ethers.getContractFactory("InsecureNaiveBank");
    const bank = await bankFactory.deploy();
    const bankAddress = await bank.getAddress();
    console.log(`bank.address :  ${bankAddress}`);

    bank.on("RegisterUser", (user,index) => {
        console.log(`Register user: [${index}] : ${user}`);
    });
    bank.on('applyInterestEvent',()=>{
        console.log('bank.applyInterestEvent() invoked');
    })


    const attackFactory = await ethers.getContractFactory("Attack");
    const attack = await attackFactory.deploy(bank.target);
    const attackAddress = await attack.getAddress();
    console.log(`attack.address :  ${attackAddress}`)
    console.log("\n\n");



    console.log("---- user1 deposits 1 Ether ----");
    const depositAmount = ethers.parseEther("1");
    await bank.connect(signer1).deposit({ value: depositAmount });






    console.log("----  before the attack  ----");
    console.log(`bank.getBankBalance() :  ${await bank.getBankBalance()}`)
    console.log(`bank.getUserBalance(user0) :  ${await bank.getUserBalance(signer1.address)}`);
    console.log(`bank.getUserBalance(attack) :  ${await bank.getUserBalance(await attack.getAddress())}`);

    

    console.log("---- Perfom the 20-time double spending attack by depositing ----")

    
    // bank.connect(signer1).withdraw(withdrawAmount);


    await attack.attack(20,{value:depositAmount});




    console.log("---- bank's admin calculates user's interest ----")
    await bank.applyInterest();


    console.log("---- after the attack  ----");
    console.log(`bank.getBankBalance() :  ${await bank.getBankBalance()}`)
    console.log(`bank.getUserBalance(user0) :  ${await bank.getUserBalance(signer1.address)}`);
    console.log(`bank.getUserBalance(attack) :  ${await bank.getUserBalance(await attack.getAddress())}`);


    setTimeout(async () => {
        bank.removeAllListeners();
    }, 4000);
}



main()


async function log(msg: string) {
    new Promise(resolve => setTimeout(()=>{
        console.log(msg);
    }, 1000));
}