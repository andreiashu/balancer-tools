import invariant from "tiny-invariant";

import { getBALPriceByRound } from "../(utils)/getBALPriceByRound";
import { Round } from "../(utils)/rounds";

export default async function BALPrice({
  roundId,
}: {
  roundId?: string | string[];
}) {
  invariant(!Array.isArray(roundId), "roundId cannot be a list");

  const round = roundId
    ? Round.getRoundByNumber(roundId)
    : Round.currentRound();

  const price = await getBALPriceByRound(round);

  return (
    <div>
      BAL price:{" "}
      {price
        ? price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : "error"}
    </div>
  );
}
