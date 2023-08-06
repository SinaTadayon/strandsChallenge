/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  StrandTransfer,
  StrandTransferInterface,
} from "../../contracts/StrandTransfer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "recipient",
        type: "address",
      },
    ],
    name: "transferEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600160005561056e806100256000396000f3fe60806040526004361061002d5760003560e01c806330df47af14610039578063f5537ede1461005b57600080fd5b3661003457005b600080fd5b34801561004557600080fd5b5061005961005436600461043e565b61007b565b005b34801561006757600080fd5b50610059610076366004610462565b61010b565b67016345785d8a000047116100ce5760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742042616c616e636560601b60448201526064015b60405180910390fd5b6040516001600160a01b0382169060009067016345785d8a00009082818181858883f19350505050158015610107573d6000803e3d6000fd5b5050565b61011361012d565b61011e838383610186565b6101286001600055565b505050565b60026000540361017f5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016100c5565b6002600055565b604080516001600160a01b03848116602483015260448083018590528351808403909101815260649092018352602080830180516001600160e01b031663a9059cbb60e01b17905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65649084015261012892869291600091610216918516908490610296565b905080516000148061023757508080602001905181019061023791906104a3565b6101285760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016100c5565b60606102a584846000856102ad565b949350505050565b60608247101561030e5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016100c5565b600080866001600160a01b0316858760405161032a91906104e9565b60006040518083038185875af1925050503d8060008114610367576040519150601f19603f3d011682016040523d82523d6000602084013e61036c565b606091505b509150915061037d87838387610388565b979650505050505050565b606083156103f75782516000036103f0576001600160a01b0385163b6103f05760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016100c5565b50816102a5565b6102a5838381511561040c5781518083602001fd5b8060405162461bcd60e51b81526004016100c59190610505565b6001600160a01b038116811461043b57600080fd5b50565b60006020828403121561045057600080fd5b813561045b81610426565b9392505050565b60008060006060848603121561047757600080fd5b833561048281610426565b9250602084013561049281610426565b929592945050506040919091013590565b6000602082840312156104b557600080fd5b8151801515811461045b57600080fd5b60005b838110156104e05781810151838201526020016104c8565b50506000910152565b600082516104fb8184602087016104c5565b9190910192915050565b60208152600082518060208401526105248160408501602087016104c5565b601f01601f1916919091016040019291505056fea2646970667358221220821063b1c8d4927ef2ac3cd994c112380da10ead3973c309004c8661a877612864736f6c63430008130033";

type StrandTransferConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StrandTransferConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StrandTransfer__factory extends ContractFactory {
  constructor(...args: StrandTransferConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      StrandTransfer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): StrandTransfer__factory {
    return super.connect(runner) as StrandTransfer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StrandTransferInterface {
    return new Interface(_abi) as StrandTransferInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): StrandTransfer {
    return new Contract(address, _abi, runner) as unknown as StrandTransfer;
  }
}