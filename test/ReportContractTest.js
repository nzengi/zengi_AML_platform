const { expect } = require("chai");

describe("ReportContract", function () {
  let ReportContract, reportContract;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    ReportContract = await ethers.getContractFactory("ReportContract");
    reportContract = await ReportContract.deploy();
    await reportContract.deployed();
  });

  it("should submit a report", async function () {
    const tx = await reportContract.submitReport("QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco");
    await tx.wait();

    const report = await reportContract.getReport(1);
    expect(report.ipfsHash).to.equal("QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco");
  });

  it("should allow verification of a report", async function () {
    await reportContract.submitReport("QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco");
    await reportContract.verifyReport(1);

    const report = await reportContract.getReport(1);
    expect(report.verified).to.equal(true);
  });
});
