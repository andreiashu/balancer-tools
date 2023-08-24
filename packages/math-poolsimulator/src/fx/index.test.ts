import { bnum, FxMaths, FxPool, SubgraphPoolBase } from "@balancer-labs/sor";
import { formatFixed } from "@ethersproject/bignumber";
import { describe, test } from "@jest/globals";

import { numberToBigNumber } from "../conversions";
import { verifyApproximateEquality } from "../utils";
import poolsFromFile from "./fixtures/data.json";
import { expect } from "@jest/globals";

describe("Tests new Fx math function based on package other functions", () => {
  const poolData = poolsFromFile["pool"];
  const tokens = poolData.tokens.map((token) => token.address);
  const percentages = [10];

  let tokenIndex = -1;
  [tokens[1]].forEach((tokenIn) => {
    const tokenOut = tokenIn === tokens[0] ? tokens[1] : tokens[0];
    tokenIndex++;

    percentages.forEach((percentage) => {
      const log = (message?: any, ...optionalParams: any[]) => {
        console.log.apply(this, [
          `[${tokenIn}][${percentage}%] ${message}`,
          ...optionalParams,
        ]);
      };
      describe(`Tests for ${percentage}% with ${tokenIn} as tokenIn`, () => {
        const pool = FxPool.fromPool(poolData as SubgraphPoolBase);
        log("tokenIn", tokenIn);
        log("tokenOut", tokenOut);
        const poolPairDataBeforeSwap = pool.parsePoolPairData(
          tokenIn,
          tokenOut
        );

        log("poolPairDataBeforeSwap", poolPairDataBeforeSwap);
        log(
          "poolPairDataBeforeSwap.balanceOut",
          poolPairDataBeforeSwap.balanceOut.toString()
        );

        const amount =
          Number(
            formatFixed(
              poolPairDataBeforeSwap.balanceIn,
              poolPairDataBeforeSwap.decimalsIn
            )
          ) *
          (percentage / 100);
        const amountOldBigNumber = bnum(amount);
        log("amountOldBigNumber", amountOldBigNumber.toString());

        // const spotPriceOriginal =
        //   FxMaths._spotPriceAfterSwapExactTokenInForTokenOut(
        //     poolPairDataBeforeSwap,
        //     bnum('0')
        //   );

        const spotPriceExpected =
          FxMaths._spotPriceAfterSwapExactTokenInForTokenOut(
            poolPairDataBeforeSwap,
            amountOldBigNumber
          );

        // log("spotPriceOriginal", spotPriceOriginal.toString());
        log("spotPriceExpected", spotPriceExpected.toString());

        test(`_spotPrice`, () => {
          const amountOut = pool._exactTokenInForTokenOut(
            poolPairDataBeforeSwap,
            bnum(amount)
          );

          const balanceInDelta = numberToBigNumber({
            number: amount,
            decimals: poolPairDataBeforeSwap.decimalsIn,
          });
          pool.updateTokenBalanceForPool(
            tokenIn,
            poolPairDataBeforeSwap.balanceIn.sub(balanceInDelta)
          );

          const balanceOutDelta = numberToBigNumber({
            number: amountOut.toNumber(),
            decimals: poolPairDataBeforeSwap.decimalsOut,
          });
          pool.updateTokenBalanceForPool(
            tokenOut,
            poolPairDataBeforeSwap.balanceOut.add(balanceOutDelta)
          );

          const five = formatFixed('5', 3);

          const poolPairDataAfterSwap = pool.parsePoolPairData(
            tokenIn,
            tokenOut
          );
          const spotPrice = FxMaths._spotPriceAfterSwapExactTokenInForTokenOut(
            poolPairDataAfterSwap,
            bnum(0)
          );

          log("spotPrice", spotPrice.toString());

          expect(spotPrice.toString()).toEqual(spotPriceExpected.toString());
          // verifyApproximateEquality(
          //   spotPrice.toNumber(),
          //   spotPriceExpected.toNumber(),
          // );
        });
      });
    });
  });
});
