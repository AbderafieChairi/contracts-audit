import "@nomiclabs/hardhat-ethers"
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test Contract", function () {
  it("depolyed to local network", async function () {
    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy();
    
    const count = await test.retrieve();
    expect(count).to.be.equal(0);
  });
});

describe("Attack Contract", function () {
  it("depolyed to local network", async function () {
    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy();
    const test_address = await test.getAddress();

    const Attack = await ethers.getContractFactory("OtherAttack");
    const attack = await Attack.deploy();
    
    await attack.setEtherVault(test_address);
    const count = await attack.callRetrieve();
    expect(count).to.be.equal(1);
  });
});
