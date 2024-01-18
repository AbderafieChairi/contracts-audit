import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleVault", function () {
    it("Should deposit ether from two signers", async function () {
        const [deployer, signer1] = await ethers.getSigners();
        const SimpleVault = await ethers.getContractFactory("SimpleVault");
        const vault = await SimpleVault.deploy();
        const depositAmount = ethers.parseEther("1.0");
        
        
        
        // Deposit from deployer
        await vault.deposit({ value: depositAmount });
    
        // Check contract and user balance
        let contractBalance = await vault.getBalance();

        expect(contractBalance).to.equal(depositAmount);
        expect(await vault.getUserBalance(deployer.address)).to.equal(depositAmount);
    
        // Deposit from signer1
        await vault.connect(signer1).deposit({ value: depositAmount });
        
        expect(await vault.getUserBalance(signer1.address)).to.equal(depositAmount);
      });




});