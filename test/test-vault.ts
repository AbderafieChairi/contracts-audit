import "@nomiclabs/hardhat-ethers"
import { expect } from "chai";
import { ethers } from "hardhat";

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

describe("InsecureEtherVault", () => {
    let vault: any;

    beforeEach(async () => {
        const Vault = await ethers.getContractFactory("InsecureEtherVault");
        vault = await Vault.deploy();
    });

    it("should deposit and withdraw ether", async () => {
        const depositAmount = ethers.parseEther("1");
        await vault.deposit({ value: depositAmount });
        const [owner] = await ethers.getSigners();
        const userBalance = await vault.getUserBalance(owner.address);
        console.log("User balance:", userBalance.toString());
        console.log(depositAmount.toString())
        expect(userBalance.toString()).to.equal(depositAmount.toString());
        await vault.withdrawAll()
        const contractBalance = await vault.getBalance();
        expect(contractBalance).to.equal(0);
    });
});
