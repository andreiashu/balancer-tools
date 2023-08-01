import {
  DerivedGyroEParamsFromSubgraph,
  GyroEParamsFromSubgraph,
} from "@bleu-balancer-tools/math-poolsimulator/src/gyroE";

type NumberGyroEParams<T> = {
  [K in keyof T]?: number;
};

export interface TokensData {
  symbol: string;
  balance: number;
  decimal: number;
  rate?: number;
  weight?: number;
}

export interface MetaStableParams {
  ampFactor?: number;
  swapFee?: number;
}

export type GyroEParams = NumberGyroEParams<
  GyroEParamsFromSubgraph & DerivedGyroEParamsFromSubgraph
>;

export interface Gyro2Params {
  swapFee?: number;
  alpha?: number;
  beta?: number;
}

export type CombinedParams = MetaStableParams & GyroEParams & Gyro2Params;

export enum PoolTypeEnum {
  MetaStable = "MetaStable",
  GyroE = "GyroE",
  Gyro2 = "Gyro2",
  Gyro3 = "Gyro3",
}
