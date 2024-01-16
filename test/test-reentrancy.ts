import "@nomiclabs/hardhat-ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ContractFactory, ethers as eth } from "ethers";
import { ethers } from "hardhat";


type Deployed = eth.BaseContract & {
    deploymentTransaction(): eth.ContractTransactionResponse;
} & Omit<eth.BaseContract, keyof eth.BaseContract>

interface InsecureEtherVault {
    deposit: () => Promise<void>;
    withdrawAll: () => Promise<void>;
    getBalance: () => Promise<number>;
    getUserBalance: (user: string) => Promise<number>;
}


interface Attack {
    attack: (value: number) => Promise<void>;
    getBalance: () => Promise<number>;
}

describe("Reentrancy Attack Test", function () {
    let insecureEtherVault:any;
    let attack:any;
    let user1: string;
    let user2: string;
    beforeEach(async function () {
        // Use a type assertion to ensure `signer1` and `signer2` are ethers.Signer
        const [signer1, signer2] = await ethers.getSigners() as SignerWithAddress[];
        user1 = signer1.address;
        user2 = signer2.address;
    
        insecureEtherVault = await (await ethers.getContractFactory("Counter")).deploy();
        
        attack = await (await ethers.getContractFactory("CounterCaller")).deploy(insecureEtherVault.target);
        
    });
    
    it("Demonstrates the reentrancy attack", async function () {
        // conso
        // // Deposit ETH into InsecureEtherVault
        // await insecureEtherVault.deposit({ value: ethers.parseEther("3") }); // From user1
        // await insecureEtherVault.deposit({ value: ethers.parseEther("2") }); // From user2

        // // Check initial balances
        // expect(await insecureEtherVault.getBalance()).to.equal(ethers.parseEther("5"));
        // expect(await insecureEtherVault.getUserBalance(user1)).to.equal(
        //     ethers.parseEther("3")
        // );
        // expect(await insecureEtherVault.getUserBalance(user2)).to.equal(
        //     ethers.parseEther("2")
        // );
    })

});


















// import "@nomiclabs/hardhat-ethers"
// import { expect } from "chai";
// import { ethers } from "hardhat";




// interface IAttack {
//   attack: (value: ethers.utils.BigNumberish) => Promise<ethers.ContractTransaction>;
//   getBalance: () => Promise<ethers.utils.BigNumber>;
// }

// describe("Reentrancy Attack Test", function () {

//   let insecureEtherVault: ethers.;
//   let attack: ethers.Contract;
//   let user1: string;
//   let user2: string;

//   beforeEach(async function () {
//     // Use a type assertion to ensure `signer1` and `signer2` are ethers.Signer
//     const [signer1, signer2] = await ethers.getSigners() as ethers.Signer[];
//     user1 = signer1.address;
//     user2 = signer2.address;

//     insecureEtherVault = (
//       await ethers.getContractFactory("InsecureEtherVault") as ethers.ContractFactory
//     ).deploy();

//     attack = (await ethers.getContractFactory("Attack") as ethers.ContractFactory).deploy(
//       insecureEtherVault.address
//     );
//   });

//   it("Demonstrates the reentrancy attack", async function () {
//     // Deposit ETH into InsecureEtherVault
//     await insecureEtherVault.deposit({ value: ethers.utils.parseEther("3") }); // From user1
//     await insecureEtherVault.deposit({ value: ethers.utils.parseEther("2") }); // From user2

//     // Check initial balances
//     expect(await insecureEtherVault.getBalance()).to.equal(ethers.utils.parseEther("5"));
//     expect(await insecureEtherVault.getUserBalance(user1)).to.equal(
//       ethers.utils.parseEther("3")
//     );
//     expect(await insecureEtherVault.getUserBalance(user2)).to.equal(
//       ethers.utils.parseEther("2")
//     );
//     expect(await attack.getBalance()).to.equal(0);

//     // Initiate the attack
//     await attack.attack({ value: ethers.utils.parseEther("1") });

//     // Check balances after the attack
//     expect(await insecureEtherVault.getBalance()).to.equal(0);
//     expect(await attack.getBalance()).to.equal(ethers.utils.parseEther("6")); // Stolen ETH
//   });
// });
