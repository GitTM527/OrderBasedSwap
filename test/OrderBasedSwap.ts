import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture,  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { token } from "../typechain-types/@openzeppelin/contracts";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol"
// import { ERC20 } from "../typechain-types";
  
  describe("OrderBasedSwap", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployTobilobaToken() {
      // Contracts are deployed using the first signer/account by default
      
      const Tobiloba =  await ethers.getContractFactory("Tobiloba");
      const tobiloba = await Tobiloba.deploy();  
      return { tobiloba };

    }

      async function deployTobex1Token() {
        // Contracts are deployed using the first signer/account by default
         
        const Tobex1 =  await ethers.getContractFactory("Tobex1");
        const  tobex1 = await Tobex1.deploy();
        return { tobex1 };

    }


    async function deployOrderBasedSwap(){
        //contracts are deployed using the first signer/account by default
        const { tobiloba } = await loadFixture(deployTobilobaToken);
        const { tobex1 }= await loadFixture(deployTobex1Token);
        const signers = await ethers.getSigners();
        const [owner, address1, address2, address3, address4, address5 ] = signers;

        
        
        const OrderBasedSwap = await ethers.getContractFactory("OrderBasedSwap");
        const orderBasedSwap = await OrderBasedSwap.deploy(tobiloba, tobex1);

            // transfer token to the contract
        // await TBIT.transfer(await orderBasedSwap.getAddress(), ethers.parseEther("100000.0"));
        // await TB31.transfer(await orderBasedSwap.getAddress(), ethers.parseEther("100000.0"));

        return { orderBasedSwap, owner, address1, address2, address3, tobiloba, tobex1 };
    }


    describe("Deployment", function() {
        it ("check if addresses of tokens are correctly deployed", async function(){
        const {orderBasedSwap, tobiloba, tobex1, address1} = await loadFixture(deployOrderBasedSwap);
        expect(await orderBasedSwap.getAddress()).to.properAddress;
        expect(await orderBasedSwap.tobilobaToken()).to.equal(tobiloba);
        expect(await orderBasedSwap.tobex1Token()).to.equal(tobex1);
        console.log(await tobex1.balanceOf(address1));
        //expect(IERC20(tobiloba).balanceOf(await orderBasedSwap.getAddress())).to.equal(ethers.parseEther("10000.0"));
        //expect(IERC20(tobex1).balanceOf(orderBasedSwap.getAddress())).to.equal(ethers.parseEther("10000.0"));

        })
    })

  }) 
