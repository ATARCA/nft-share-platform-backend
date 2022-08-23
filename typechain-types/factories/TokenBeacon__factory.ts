/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TokenBeacon, TokenBeaconInterface } from "../TokenBeacon";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenBeacon_vLogic",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenBeacon_vLogic",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenBeacon_vLogic",
        type: "address",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620017a4380380620017a48339818101604052810190620000379190620003a0565b620000576200004b6200011d60201b60201c565b6200012560201b60201c565b81604051620000669062000328565b620000729190620003f8565b604051809103906000f0801580156200008f573d6000803e3d6000fd5b5073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200011581620001e960201b60201c565b505062000530565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b620001f96200011d60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff166200021f620002ff60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff161462000278576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200026f9062000476565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415620002eb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002e2906200050e565b60405180910390fd5b620002fc816200012560201b60201c565b50565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610a918062000d1383390190565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000368826200033b565b9050919050565b6200037a816200035b565b81146200038657600080fd5b50565b6000815190506200039a816200036f565b92915050565b60008060408385031215620003ba57620003b962000336565b5b6000620003ca8582860162000389565b9250506020620003dd8582860162000389565b9150509250929050565b620003f2816200035b565b82525050565b60006020820190506200040f6000830184620003e7565b92915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006200045e60208362000415565b91506200046b8262000426565b602082019050919050565b6000602082019050818103600083015262000491816200044f565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000620004f660268362000415565b9150620005038262000498565b604082019050919050565b600060208201905081810360008301526200052981620004e7565b9050919050565b6080516107c06200055360003960008181610181015261025201526107c06000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80631c1b8772146100675780635c60da1b14610083578063715018a6146100a15780638da5cb5b146100ab578063d723c565146100c9578063f2fde38b146100e7575b600080fd5b610081600480360381019061007c91906105e2565b610103565b005b61008b61024e565b604051610098919061061e565b60405180910390f35b6100a96102e4565b005b6100b361036c565b6040516100c0919061061e565b60405180910390f35b6100d1610395565b6040516100de919061061e565b60405180910390f35b61010160048036038101906100fc91906105e2565b6103bb565b005b61010b6104b3565b73ffffffffffffffffffffffffffffffffffffffff1661012961036c565b73ffffffffffffffffffffffffffffffffffffffff161461017f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161017690610696565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16633659cfe6826040518263ffffffff1660e01b81526004016101d8919061061e565b600060405180830381600087803b1580156101f257600080fd5b505af1158015610206573d6000803e3d6000fd5b5050505080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102df91906106cb565b905090565b6102ec6104b3565b73ffffffffffffffffffffffffffffffffffffffff1661030a61036c565b73ffffffffffffffffffffffffffffffffffffffff1614610360576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161035790610696565b60405180910390fd5b61036a60006104bb565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6103c36104b3565b73ffffffffffffffffffffffffffffffffffffffff166103e161036c565b73ffffffffffffffffffffffffffffffffffffffff1614610437576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042e90610696565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156104a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049e9061076a565b60405180910390fd5b6104b0816104bb565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006105af82610584565b9050919050565b6105bf816105a4565b81146105ca57600080fd5b50565b6000813590506105dc816105b6565b92915050565b6000602082840312156105f8576105f761057f565b5b6000610606848285016105cd565b91505092915050565b610618816105a4565b82525050565b6000602082019050610633600083018461060f565b92915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610680602083610639565b915061068b8261064a565b602082019050919050565b600060208201905081810360008301526106af81610673565b9050919050565b6000815190506106c5816105b6565b92915050565b6000602082840312156106e1576106e061057f565b5b60006106ef848285016106b6565b91505092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610754602683610639565b915061075f826106f8565b604082019050919050565b6000602082019050818103600083015261078381610747565b905091905056fea26469706673582212207cd75f027a1a8407e0d32faba122855b79aa6445bf4bb08c79f021022f39fed764736f6c634300080c0033608060405234801561001057600080fd5b5060405162000a9138038062000a918339818101604052810190610034919061023d565b61005061004561006560201b60201c565b61006d60201b60201c565b61005f8161013160201b60201c565b5061030d565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b610144816101c760201b6103781760201c565b610183576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161017a906102ed565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600080823b905060008111915050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061020a826101df565b9050919050565b61021a816101ff565b811461022557600080fd5b50565b60008151905061023781610211565b92915050565b600060208284031215610253576102526101da565b5b600061026184828501610228565b91505092915050565b600082825260208201905092915050565b7f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f60008201527f6e206973206e6f74206120636f6e747261637400000000000000000000000000602082015250565b60006102d760338361026a565b91506102e28261027b565b604082019050919050565b60006020820190508181036000830152610306816102ca565b9050919050565b610774806200031d6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633659cfe61461005c5780635c60da1b14610078578063715018a6146100965780638da5cb5b146100a0578063f2fde38b146100be575b600080fd5b61007660048036038101906100719190610546565b6100da565b005b6100806101a5565b60405161008d9190610582565b60405180910390f35b61009e6101cf565b005b6100a8610257565b6040516100b59190610582565b60405180910390f35b6100d860048036038101906100d39190610546565b610280565b005b6100e261038b565b73ffffffffffffffffffffffffffffffffffffffff16610100610257565b73ffffffffffffffffffffffffffffffffffffffff1614610156576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161014d906105fa565b60405180910390fd5b61015f81610393565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6101d761038b565b73ffffffffffffffffffffffffffffffffffffffff166101f5610257565b73ffffffffffffffffffffffffffffffffffffffff161461024b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610242906105fa565b60405180910390fd5b610255600061041f565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61028861038b565b73ffffffffffffffffffffffffffffffffffffffff166102a6610257565b73ffffffffffffffffffffffffffffffffffffffff16146102fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f3906105fa565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561036c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103639061068c565b60405180910390fd5b6103758161041f565b50565b600080823b905060008111915050919050565b600033905090565b61039c81610378565b6103db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d29061071e565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610513826104e8565b9050919050565b61052381610508565b811461052e57600080fd5b50565b6000813590506105408161051a565b92915050565b60006020828403121561055c5761055b6104e3565b5b600061056a84828501610531565b91505092915050565b61057c81610508565b82525050565b60006020820190506105976000830184610573565b92915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006105e460208361059d565b91506105ef826105ae565b602082019050919050565b60006020820190508181036000830152610613816105d7565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061067660268361059d565b91506106818261061a565b604082019050919050565b600060208201905081810360008301526106a581610669565b9050919050565b7f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f60008201527f6e206973206e6f74206120636f6e747261637400000000000000000000000000602082015250565b600061070860338361059d565b9150610713826106ac565b604082019050919050565b60006020820190508181036000830152610737816106fb565b905091905056fea2646970667358221220c2e3f3371a26abe8a300c0795dc24cccc49faba2a4790af7de32dda83118078164736f6c634300080c0033";

type TokenBeaconConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenBeaconConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenBeacon__factory extends ContractFactory {
  constructor(...args: TokenBeaconConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TokenBeacon";
  }

  deploy(
    _tokenBeacon_vLogic: string,
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenBeacon> {
    return super.deploy(
      _tokenBeacon_vLogic,
      _owner,
      overrides || {}
    ) as Promise<TokenBeacon>;
  }
  getDeployTransaction(
    _tokenBeacon_vLogic: string,
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _tokenBeacon_vLogic,
      _owner,
      overrides || {}
    );
  }
  attach(address: string): TokenBeacon {
    return super.attach(address) as TokenBeacon;
  }
  connect(signer: Signer): TokenBeacon__factory {
    return super.connect(signer) as TokenBeacon__factory;
  }
  static readonly contractName: "TokenBeacon";
  public readonly contractName: "TokenBeacon";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenBeaconInterface {
    return new utils.Interface(_abi) as TokenBeaconInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenBeacon {
    return new Contract(address, _abi, signerOrProvider) as TokenBeacon;
  }
}