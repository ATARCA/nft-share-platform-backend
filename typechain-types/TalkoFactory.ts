/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface TalkoFactoryInterface extends utils.Interface {
  contractName: "TalkoFactory";
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "EndorseERC721BeaconAddress()": FunctionFragment;
    "LikeERC721BeaconAddress()": FunctionFragment;
    "OPERATOR_ROLE()": FunctionFragment;
    "ShareableERC721BeaconAddress()": FunctionFragment;
    "addAdmin(address)": FunctionFragment;
    "addOperator(address)": FunctionFragment;
    "createEndorseERC721Proxy(string,string,address)": FunctionFragment;
    "createLikeERC721Proxy(string,string,address)": FunctionFragment;
    "createShareableERC721Proxy(string,string,address)": FunctionFragment;
    "endorsableProxyNameExists(string)": FunctionFragment;
    "getIndexForEndorseERC721ProxyInstance()": FunctionFragment;
    "getIndexForLikeERC721ProxyInstance()": FunctionFragment;
    "getIndexForShareableERC721ProxyInstance()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "likeableProxyNameExists(string)": FunctionFragment;
    "removeAdmin(address)": FunctionFragment;
    "removeOperator(address)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "shareableProxyNameExists(string)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "EndorseERC721BeaconAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "LikeERC721BeaconAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "OPERATOR_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ShareableERC721BeaconAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "addAdmin", values: [string]): string;
  encodeFunctionData(functionFragment: "addOperator", values: [string]): string;
  encodeFunctionData(
    functionFragment: "createEndorseERC721Proxy",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "createLikeERC721Proxy",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "createShareableERC721Proxy",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "endorsableProxyNameExists",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getIndexForEndorseERC721ProxyInstance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getIndexForLikeERC721ProxyInstance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getIndexForShareableERC721ProxyInstance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "likeableProxyNameExists",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "removeAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "removeOperator",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "shareableProxyNameExists",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "EndorseERC721BeaconAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "LikeERC721BeaconAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "OPERATOR_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ShareableERC721BeaconAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createEndorseERC721Proxy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createLikeERC721Proxy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createShareableERC721Proxy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endorsableProxyNameExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIndexForEndorseERC721ProxyInstance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIndexForLikeERC721ProxyInstance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIndexForShareableERC721ProxyInstance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "likeableProxyNameExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "shareableProxyNameExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "EndorseERC721ProxyCreated(address,address,string,string)": EventFragment;
    "LikeERC721ProxyCreated(address,address,string,string)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "ShareableERC721ProxyCreated(address,address,string,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EndorseERC721ProxyCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LikeERC721ProxyCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ShareableERC721ProxyCreated"
  ): EventFragment;
}

export type EndorseERC721ProxyCreatedEvent = TypedEvent<
  [string, string, string, string],
  { _eproxy: string; _owner: string; _name: string; _symbol: string }
>;

export type EndorseERC721ProxyCreatedEventFilter =
  TypedEventFilter<EndorseERC721ProxyCreatedEvent>;

export type LikeERC721ProxyCreatedEvent = TypedEvent<
  [string, string, string, string],
  { _lproxy: string; _owner: string; _name: string; _symbol: string }
>;

export type LikeERC721ProxyCreatedEventFilter =
  TypedEventFilter<LikeERC721ProxyCreatedEvent>;

export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  { role: string; previousAdminRole: string; newAdminRole: string }
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export type ShareableERC721ProxyCreatedEvent = TypedEvent<
  [string, string, string, string],
  { _sproxy: string; _owner: string; _name: string; _symbol: string }
>;

export type ShareableERC721ProxyCreatedEventFilter =
  TypedEventFilter<ShareableERC721ProxyCreatedEvent>;

export interface TalkoFactory extends BaseContract {
  contractName: "TalkoFactory";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TalkoFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    EndorseERC721BeaconAddress(overrides?: CallOverrides): Promise<[string]>;

    LikeERC721BeaconAddress(overrides?: CallOverrides): Promise<[string]>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<[string]>;

    ShareableERC721BeaconAddress(overrides?: CallOverrides): Promise<[string]>;

    addAdmin(
      newAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addOperator(
      newOperater: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createEndorseERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createLikeERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createShareableERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endorsableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getIndexForEndorseERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getIndexForLikeERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getIndexForShareableERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    likeableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeOperator(
      operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    shareableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  EndorseERC721BeaconAddress(overrides?: CallOverrides): Promise<string>;

  LikeERC721BeaconAddress(overrides?: CallOverrides): Promise<string>;

  OPERATOR_ROLE(overrides?: CallOverrides): Promise<string>;

  ShareableERC721BeaconAddress(overrides?: CallOverrides): Promise<string>;

  addAdmin(
    newAdmin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addOperator(
    newOperater: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createEndorseERC721Proxy(
    _name: string,
    _symbol: string,
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createLikeERC721Proxy(
    _name: string,
    _symbol: string,
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createShareableERC721Proxy(
    _name: string,
    _symbol: string,
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endorsableProxyNameExists(
    _name: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getIndexForEndorseERC721ProxyInstance(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getIndexForLikeERC721ProxyInstance(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getIndexForShareableERC721ProxyInstance(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  likeableProxyNameExists(
    _name: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeAdmin(
    admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeOperator(
    operator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  shareableProxyNameExists(
    _name: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    EndorseERC721BeaconAddress(overrides?: CallOverrides): Promise<string>;

    LikeERC721BeaconAddress(overrides?: CallOverrides): Promise<string>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<string>;

    ShareableERC721BeaconAddress(overrides?: CallOverrides): Promise<string>;

    addAdmin(newAdmin: string, overrides?: CallOverrides): Promise<void>;

    addOperator(newOperater: string, overrides?: CallOverrides): Promise<void>;

    createEndorseERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: CallOverrides
    ): Promise<string>;

    createLikeERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: CallOverrides
    ): Promise<string>;

    createShareableERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: CallOverrides
    ): Promise<string>;

    endorsableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getIndexForEndorseERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIndexForLikeERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIndexForShareableERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    likeableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeAdmin(admin: string, overrides?: CallOverrides): Promise<void>;

    removeOperator(operator: string, overrides?: CallOverrides): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    shareableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "EndorseERC721ProxyCreated(address,address,string,string)"(
      _eproxy?: string | null,
      _owner?: string | null,
      _name?: null,
      _symbol?: null
    ): EndorseERC721ProxyCreatedEventFilter;
    EndorseERC721ProxyCreated(
      _eproxy?: string | null,
      _owner?: string | null,
      _name?: null,
      _symbol?: null
    ): EndorseERC721ProxyCreatedEventFilter;

    "LikeERC721ProxyCreated(address,address,string,string)"(
      _lproxy?: string | null,
      _owner?: string | null,
      _name?: null,
      _symbol?: null
    ): LikeERC721ProxyCreatedEventFilter;
    LikeERC721ProxyCreated(
      _lproxy?: string | null,
      _owner?: string | null,
      _name?: null,
      _symbol?: null
    ): LikeERC721ProxyCreatedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;

    "ShareableERC721ProxyCreated(address,address,string,string)"(
      _sproxy?: string | null,
      _owner?: string | null,
      _name?: null,
      _symbol?: null
    ): ShareableERC721ProxyCreatedEventFilter;
    ShareableERC721ProxyCreated(
      _sproxy?: string | null,
      _owner?: string | null,
      _name?: null,
      _symbol?: null
    ): ShareableERC721ProxyCreatedEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    EndorseERC721BeaconAddress(overrides?: CallOverrides): Promise<BigNumber>;

    LikeERC721BeaconAddress(overrides?: CallOverrides): Promise<BigNumber>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    ShareableERC721BeaconAddress(overrides?: CallOverrides): Promise<BigNumber>;

    addAdmin(
      newAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addOperator(
      newOperater: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createEndorseERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createLikeERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createShareableERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endorsableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIndexForEndorseERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIndexForLikeERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIndexForShareableERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    likeableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeOperator(
      operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    shareableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    EndorseERC721BeaconAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    LikeERC721BeaconAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ShareableERC721BeaconAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addAdmin(
      newAdmin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addOperator(
      newOperater: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createEndorseERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createLikeERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createShareableERC721Proxy(
      _name: string,
      _symbol: string,
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endorsableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIndexForEndorseERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIndexForLikeERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIndexForShareableERC721ProxyInstance(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    likeableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeOperator(
      operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    shareableProxyNameExists(
      _name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
