import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture,  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  
  describe("OrderBasedSwap", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployTobilobaToken() {
      // Contracts are deployed using the first signer/account by default
      
      const TobilobaToken =  await ethers.getContractFactory("TobilobaToken");
      const token = await TobilobaToken.deploy();  
      return { token };

    }

      async function deployTB3I() {
        // Contracts are deployed using the first signer/account by default
         
        const TB3I =  await ethers.getContractFactory("TB3I");
        const token = await TB3I.deploy();
        return { token };

    }


        async function deployOrderBasedSwap(){
            //contracts are deployed using the first signer/account by default
            const signers = await ethers.getSigners();
            const [owner, address1, address2, address3, address4, address5 ] = signers;
            const { token: TobilobaToken } = await loadFixture(deployTobilobaToken);
            const { token: TB3I } = await loadFixture(deployTB3I);
            
            
            const OrderBasedSwap = await ethers.getContractFactory("OrderBasedSwap");
            const orderBasedSwap = await OrderBasedSwap.deploy(TobilobaToken.getAddress(), TB3I.getAddress());

            // transfer token to the contract
        await TobilobaToken.transfer(await orderBasedSwap.getAddress(), ethers.parseEther("100000.0"));
        await TB3I.transfer(await orderBasedSwap.getAddress(), ethers.parseEther("100000.0"));

        return { orderBasedSwap, owner, address1, address2, address3, TobilobaToken, TB3I };
        }

    
  }) 