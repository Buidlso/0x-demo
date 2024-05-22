const QueryString = require("qs");
const ethers = require("ethers");
const web3 = require("web3");
const BigNumber = require("ethers");
const { Contract } = require("ethers");

const ERC20_ABI = [
  {
    name: "approve",
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    name: "allowance",
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const YOUR_WALLET_ADDRESS = "";
const PRIVATE_KEY = "";
const RPC_PROVIDER_URL = "";

const main = async () => {
  const ZERO_EX_ADDRESS = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";
  const MATIC_ADDRESS = "0x0000000000000000000000000000000000001010";
  const USDC_ADDRESS = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

  const headers = {
    "0x-api-key": "",
  };

  // Selling 100 DAI for ETH.
  const params = {
    sellToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // usdc polygon
    buyToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // matic polygon
    // sellToken: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // usdc optimism
    // buyToken: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58", // usdt optimism
    sellAmount: "400000",
    takerAddress: "0x4283e2914f9Dd81b2855415053700dd9F5677496",
  };

  console.log({ params });

  const provider = new ethers.JsonRpcProvider(RPC_PROVIDER_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  //   console.log({ wallet });
  const response = await fetch(
    `https://polygon.api.0x.org/swap/v1/quote?${QueryString.stringify(params)}`,
    {
      headers,
    }
  );

  const quote = await response.json();

  console.log({ quote });

  // const usdc = new web3.eth.Contract(ERC20_ABI, USDC_ADDRESS);
  // const currentAllowance = new BigNumber(
  //   usdc.allowance(params.takerAddress, ZERO_EX_ADDRESS).call()
  // );
  // if (currentAllowance.isLessThan(params.sellAmount)) {
  //   await usdc
  //     .approve(ZERO_EX_ADDRESS, params.sellAmount)
  //     .send({ from: params.takerAddress });
  // }

  const tx = await wallet.sendTransaction(quote);

  console.log({ tx });
};

main();
