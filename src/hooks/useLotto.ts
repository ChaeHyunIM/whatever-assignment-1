import { useMemo, useState } from "react";
import { LOTTO_PRICE } from "../constants/lotto";
import {
  generateLottoNumbers,
  generateWinningNumbers,
  getRankCounts,
  rankLottoWinningResult,
} from "../lib/lotto";
import type {
  LottoNumbers,
  RankMessage,
  WinningLottoNumbers,
} from "../types/lotto";

const useLotto = () => {
  const [lottoNumbersList, setLottoNumbersList] = useState<LottoNumbers[]>([]);
  const [winningLottoNumbers, setWinningLottoNumbers] =
    useState<null | WinningLottoNumbers>(null);
  const [rankMessages, setRankMessages] = useState<null | RankMessage[]>(null);

  const generateLotto = (purchaseAmount: number) => {
    const lottoCounts = purchaseAmount / LOTTO_PRICE;
    const lottoNumbersByLottoCounts: LottoNumbers[] = [];
    for (let i = 0; i < lottoCounts; i++) {
      lottoNumbersByLottoCounts.push(generateLottoNumbers());
    }
    setLottoNumbersList(lottoNumbersByLottoCounts);
  };

  const resetLottoNumbersList = () => {
    setLottoNumbersList([]);
    setWinningLottoNumbers(null);
    setRankMessages(null);
  };

  const checkRankMessages = () => {
    if (lottoNumbersList.length === 0) return;
    const winningLottoNumbers = generateWinningNumbers();
    const lottoRankMessages = lottoNumbersList.map((lottoNumbers) => {
      return rankLottoWinningResult(lottoNumbers, winningLottoNumbers);
    });
    setWinningLottoNumbers(generateWinningNumbers);
    setRankMessages(lottoRankMessages);
  };

  const rankCounts = useMemo(() => {
    if (rankMessages === null) {
      return null;
    }
    return getRankCounts(rankMessages);
  }, [rankMessages]);

  return {
    lottoNumbersList,
    generateLotto,
    resetLottoNumbersList,
    rankMessages,
    winningLottoNumbers,
    checkRankMessages,
    rankCounts,
  };
};

export default useLotto;
