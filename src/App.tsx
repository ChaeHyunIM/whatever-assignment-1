import { useMemo, useState } from "react";
import "./App.css";
import useLotto from "./hooks/useLotto";
import { generateWinningNumbers, rankLottoWinningResult } from "./lib/lotto";
import { isMultipleOf1000 } from "./lib/utils/number";
import type { RankMessage, WinningLottoNumbers } from "./types/lotto";

function App() {
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const {
    lottoNumbersSet,
    generateLotto,
    reset: resetLottoNumbersSet,
  } = useLotto();
  const [winningLottoNumbers, setWinningLottoNumbers] =
    useState<null | WinningLottoNumbers>(null);
  const [result, setResult] = useState<null | RankMessage[]>(null);

  const purchaseLotto = (purchaseAmount: number) => {
    if (!isMultipleOf1000(purchaseAmount)) {
      throw new Error(
        `The number ${purchaseAmount} is not a multiple of 1000.`
      );
    }
    generateLotto(purchaseAmount);
  };

  const reset = () => {
    setPurchaseAmount("");
    setWinningLottoNumbers(null);
    resetLottoNumbersSet();
    setResult(null);
  };

  const checkResult = () => {
    if (lottoNumbersSet.length === 0) return;
    const generatedWinningLottoNumbers = generateWinningNumbers();
    const lottoResult = lottoNumbersSet.map((lottoNumbers) => {
      return rankLottoWinningResult(lottoNumbers, generatedWinningLottoNumbers);
    });
    setWinningLottoNumbers(generateWinningNumbers);
    setResult(lottoResult);
  };

  const rankCounts = useMemo(() => {
    const rankCountsInit = {
      "1등": 0,
      "2등": 0,
      "3등": 0,
      "4등": 0,
      "5등": 0,
      꽝: 0,
    };
    return result
      ? result.reduce((acc, rank) => {
          acc[rank] = (acc[rank] || 0) + 1;
          return acc;
        }, rankCountsInit)
      : rankCountsInit;
  }, [result]);

  return (
    <div className="lotto-app">
      <h1>로또 어플리케이션</h1>
      <div className="lotto-price">
        <label>로또 구매 금액</label>
        <div className="input-wrapper">
          <input
            type="number"
            placeholder="금액을 입력하세요"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
          />
          <button onClick={() => purchaseLotto(Number(purchaseAmount))}>
            구매
          </button>
        </div>
      </div>
      {result && winningLottoNumbers && (
        <div className="winning-numbers">
          <h2>당첨 번호</h2>
          <div className="lotto-numbers">
            {winningLottoNumbers.mainNumbers.map((number, index) => (
              <span className="win" key={index}>
                {number}
              </span>
            ))}
          </div>
          <p>보너스 번호: {winningLottoNumbers.bonusNumber}</p>
        </div>
      )}
      <div className="lotto-results">
        <h2>구매한 로또 번호</h2>
        {lottoNumbersSet.map((lottoNumbers, index) => {
          return (
            <div className="lotto-ticket" key={index}>
              <div className="lotto-numbers">
                {lottoNumbers.map((number, index) => (
                  <span
                    key={index}
                    className={
                      winningLottoNumbers?.mainNumbers.includes(number)
                        ? "win"
                        : ""
                    }
                  >
                    {number}
                  </span>
                ))}
              </div>
              {result && <p className="result">{result[index]}</p>}
            </div>
          );
        })}
        {result && rankCounts && (
          <div className="rank-count">
            <h2>당첨 결과</h2>
            <table>
              <thead>
                <tr>
                  <th>등수</th>
                  <th>개수</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rankCounts).map(([rank, count]) => (
                  <tr key={rank}>
                    <td>{rank}</td>
                    <td>{count}개</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button onClick={checkResult}>결과확인</button>
      </div>
      <button className="reset" onClick={reset}>
        처음부터 다시하기
      </button>
    </div>
  );
}

export default App;
