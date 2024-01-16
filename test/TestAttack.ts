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
    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy();
    const test_address = await test.getAddress();
    const count = await attack.callRetrieve(test_address);
    expect(count).to.be.equal(0);
  });
});
