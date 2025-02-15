import type {
  LottoNumbers,
  Rank,
  RankMessage,
  WinningLottoNumbers,
} from "../types/lotto";
import { findDuplicates } from "./utils/array";

export const generateLottoNumbers = (): LottoNumbers => {
  const numbers: LottoNumbers = [0, 0, 0, 0, 0, 0];
  const uniqueNumbers = new Set<number>();
  while (uniqueNumbers.size < numbers.length) {
    uniqueNumbers.add(Math.floor(Math.random() * 45) + 1);
  }

  const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);

  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = sortedNumbers[i];
  }

  return numbers;
};

export const generateWinningNumbers = (): WinningLottoNumbers => {
  const mainNumbers: LottoNumbers = [0, 0, 0, 0, 0, 0];
  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < 6) {
    uniqueNumbers.add(Math.floor(Math.random() * 45) + 1);
  }

  const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);

  for (let i = 0; i < mainNumbers.length; i++) {
    mainNumbers[i] = sortedNumbers[i];
  }

  let bonusNumber: number;
  do {
    bonusNumber = Math.floor(Math.random() * 45) + 1;
  } while (uniqueNumbers.has(bonusNumber)); // Ensure bonus number is unique

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
