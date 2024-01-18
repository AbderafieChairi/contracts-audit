import { expect } from "chai";
import { ethers } from "hardhat";

// describe("SimpleVault", function () {
//     it("Should deposit ether from two signers", async function () {
//         const [deployer, signer1] = await ethers.getSigners();
//         const SimpleVault = await ethers.getContractFactory("InsecureEtherVault");
//         const vault = await SimpleVault.deploy();
//         const depositAmount = ethers.parseEther("1.0");



//         // Deposit from deployer
//         await vault.deposit({ value: depositAmount });

//         // Check contract and user balance
//         let contractBalance = await vault.getBalance();

//         expect(contractBalance).to.equal(depositAmount);
//         expect(await vault.getUserBalance(deployer.address)).to.equal(depositAmount);

//         // Deposit from signer1
//         await vault.connect(signer1).deposit({ value: depositAmount });

//         expect(await vault.getUserBalance(signer1.address)).to.equal(depositAmount);
//     });
// });

// describe("deposit and withdraw", function () {
//     it("Should deposit and withdraw ether as deployer", async function () {
//         const [deployer] = await ethers.getSigners();
//         const vaultFactory = await ethers.getContractFactory("InsecureEtherVault");
//         const vault = await vaultFactory.deploy();

//         // Deposit 1 ether
//         const depositAmount = ethers.parseEther("1.0");
//         await vault.deposit({ value: depositAmount });

//         // Check contract and deployer balance
//         expect(await vault.getBalance()).to.equal(depositAmount);
//         expect(await vault.getUserBalance(deployer.address)).to.equal(depositAmount);

//         // Withdraw all ether
//         await vault.withdrawAll();

//         // Check contract and deployer balance after withdrawal
//         expect(await vault.getBalance()).to.equal(0);
//         expect(await vault.getUserBalance(deployer.address)).to.equal(0);
//     });

//     it("Should handle deposits and withdrawals from multiple users", async function () {
//         const [deployer, signer1] = await ethers.getSigners();
//         const vaultFactory = await ethers.getContractFactory("InsecureEtherVault");
//         const vault = await vaultFactory.deploy();

//         // Deposit from deployer and signer1
//         const depositAmount = ethers.parseEther("1.0");
//         await vault.deposit({ value: depositAmount });
//         await vault.connect(signer1).deposit({ value: depositAmount });

//         // Check contract and user balances
//         expect(await vault.getBalance()).to.equal(depositAmount + depositAmount);
//         expect(await vault.getUserBalance(deployer.address)).to.equal(depositAmount);
//         expect(await vault.getUserBalance(signer1.address)).to.equal(depositAmount);

//         // Withdraw from deployer
//         await vault.withdrawAll();

//         // Check contract and user balances after deployer's withdrawal
//         expect(await vault.getBalance()).to.equal(depositAmount);
//         expect(await vault.getUserBalance(deployer.address)).to.equal(0);
//         expect(await vault.getUserBalance(signer1.address)).to.equal(depositAmount);

//         // Withdraw from signer1
//         await vault.connect(signer1).withdrawAll();

//         // Check contract and user balances after signer1's withdrawal
//         expect(await vault.getBalance()).to.equal(0);
//         expect(await vault.getUserBalance(deployer.address)).to.equal(0);
//         expect(await vault.getUserBalance(signer1.address)).to.equal(0);
//     });
// });





describe("NormalCall", function () {
  it("Should handle deposits and withdrawals through NormalCall and directly", async function () {
    const [deployer, signer1] = await ethers.getSigners();
    const vaultFactory = await ethers.getContractFactory("InsecureEtherVault");
    const vault = await vaultFactory.deploy();

    const normalCallFactory = await ethers.getContractFactory("Attack");
    const normalCall = await normalCallFactory.deploy(vault.target);

    const normalCallAddress = await normalCall.getAddress();
    // Deposit from deployer directly
    const depositAmount = ethers.parseEther("1.0");
    await vault.deposit({ value: depositAmount });

    // Deposit from signer1 through NormalCall
    await normalCall.connect(signer1).attack({ value: depositAmount });
    console.log(await normalCall.getBalance());
    // Check contract and user balances 
    expect(await vault.getBalance()).to.equal(depositAmount + depositAmount);

    expect(await vault.getUserBalance(deployer.address)).to.equal(depositAmount);
    expect(await vault.getUserBalance(normalCallAddress)).to.equal(depositAmount);

    // // Withdraw from deployer directly
    await vault.connect(deployer).withdrawAll();

    // // Check balances after deployer's withdrawal
    expect(await vault.getBalance()).to.equal(depositAmount);
    expect(await vault.getUserBalance(deployer.address)).to.equal(0);
    expect(await vault.getUserBalance(normalCallAddress)).to.equal(depositAmount);

    // // Withdraw from signer1 through NormalCall
    // await normalCall.connect(signer1).withdrawAll();

    // // Check balances after signer1's withdrawal
    // expect(await vault.getBalance()).to.equal(0);
    // expect(await vault.getUserBalance(deployer.address)).to.equal(0);
    // expect(await vault.getUserBalance(normalCallAddress)).to.equal(0);
  });
});
