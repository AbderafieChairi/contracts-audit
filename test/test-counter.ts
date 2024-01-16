import "@nomiclabs/hardhat-ethers"
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  it("initially equal to 0", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    
    const count = await counter.retrieve();
    expect(count).to.be.equal(0);
  });
  it("should retrieve a count greater than 1", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    await counter.increment();
    const count = await counter.retrieve();
    expect(count).to.be.greaterThan(0);
  });
});



describe("CounterCaller", function () {
  it("initially equal to 0", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    
    const CounterCaller = await ethers.getContractFactory("CounterCaller");
    const counterCaller = await CounterCaller.deploy(counter.target);


    const count = await counterCaller.callRetrieve();
    expect(count).to.be.equal(0);
  });
});

