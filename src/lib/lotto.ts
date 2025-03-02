import {
  LOTTO_NUMBERS_COUNT,
  LOTTO_NUMBERS_WITH_BONUS_COUNT,
  LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../constants/lotto";
import type {
  LottoNumbers,
  Rank,
  RankMessage,
  WinningLottoNumbers,
} from "../types/lotto";
import { findDuplicates } from "./utils/array";
import { generateRandomNumber } from "./utils/number";

export const isPurchaseAmountValid = (purchaseAmount: number) => {
  return purchaseAmount % LOTTO_PRICE === 0;
};

export const generateLottoNumbers = (): LottoNumbers => {
  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < LOTTO_NUMBERS_COUNT) {
    uniqueNumbers.add(generateRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER));
  }

  const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);

  return sortedNumbers;
};

export const generateWinningNumbers = (): WinningLottoNumbers => {
  const uniqueNumbersSet = new Set<number>();

  while (uniqueNumbersSet.size < LOTTO_NUMBERS_WITH_BONUS_COUNT) {
    uniqueNumbersSet.add(
      generateRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER)
    );
  }

  const uniqueNumbers = Array.from(uniqueNumbersSet);

  const bonusNumber = uniqueNumbers.pop() as number;
  const mainNumbers = uniqueNumbers.sort((a, b) => a - b) as LottoNumbers;

  return { mainNumbers, bonusNumber };
};

export const rankLottoWinningResult = (
  lottoNumbers: LottoNumbers,
  winningLottoNumbers: WinningLottoNumbers
): RankMessage => {
  const matchedNumbers = findDuplicates(
    winningLottoNumbers.mainNumbers,
    lottoNumbers
  );

  let rank: Rank;

  switch (matchedNumbers.length) {
    case 6:
      rank = 1;
      break;
    case 5:
      rank = lottoNumbers.includes(winningLottoNumbers.bonusNumber) ? 2 : 3;
      break;
    case 4:
      rank = 4;
      break;
    case 3:
      rank = 5;
      break;
    default:
      rank = -1;
      break;
  }

  return rank > 0 ? (`${rank}등` as RankMessage) : "꽝";
};

export const getRankCounts = (rankMessages: RankMessage[]) => {
  const rankCountsInit = {
    "1등": 0,
    "2등": 0,
    "3등": 0,
    "4등": 0,
    "5등": 0,
    꽝: 0,
  };
  return rankMessages
    ? rankMessages.reduce((acc, rank) => {
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
      }, rankCountsInit)
    : rankCountsInit;
};
