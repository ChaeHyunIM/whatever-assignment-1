import { useState } from "react";
import { LOTTO_PRICE } from "../constants/lotto";
import { generateLottoNumbers } from "../lib/lotto";
import type { LottoNumbersSet } from "../types/lotto";

const useLotto = () => {
  const [lottoNumbersSet, setLottoNumbersSet] = useState<LottoNumbersSet>([]);

  const generateLotto = (purchaseAmount: number) => {
    const lottoCounts = purchaseAmount / LOTTO_PRICE;
    const lottoNumbersByLottoCounts: LottoNumbersSet = [];
    for (let i = 0; i < lottoCounts; i++) {
      const newNumbers = generateLottoNumbers();
      lottoNumbersByLottoCounts.push(newNumbers);
    }
    setLottoNumbersSet(lottoNumbersByLottoCounts);
  };

  const reset = () => {
    setLottoNumbersSet([]);
  };

  return {
    lottoNumbersSet,
    generateLotto,
    reset,
  };
};

export default useLotto;
