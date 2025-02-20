import { useState } from "react";
import "./App.css";
import { LOTTO_PRICE } from "./constants/lotto";
import useLotto from "./hooks/useLotto";

function App() {
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const {
    lottoNumbersList,
    generateLotto,
    resetLottoNumbersList,
    rankMessages,
    winningLottoNumbers,
    checkRankMessages,
    rankCounts,
  } = useLotto();

  const purchaseLotto = (purchaseAmount: number) => {
    if (!(purchaseAmount % LOTTO_PRICE === 0)) {
      alert(`금액 ${purchaseAmount}은 1000의 배수가 아닙니다.`);
    }
    generateLotto(purchaseAmount);
  };

  const reset = () => {
    setPurchaseAmount(0);
    resetLottoNumbersList();
  };

  return (
    <div className="lotto-app">
      <h1>로또 어플리케이션</h1>
      <form
        className="lotto-form"
        onSubmit={(e) => {
          e.preventDefault();
          purchaseLotto(purchaseAmount);
        }}
      >
        <label htmlFor="lotto-purchase-amount">로또 구매 금액</label>
        <div className="input-wrapper">
          <input
            id="lotto-purchase-amount"
            type="number"
            placeholder="금액을 입력하세요"
            value={purchaseAmount > 0 ? purchaseAmount : ""}
            onChange={(e) => setPurchaseAmount(Number(e.target.value))}
          />
          <button>구매</button>
        </div>
      </form>
      {rankMessages && winningLottoNumbers && (
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
        {lottoNumbersList.map((lottoNumbers, index) => {
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
              {rankMessages && (
                <p className="rankMessages">{rankMessages[index]}</p>
              )}
            </div>
          );
        })}
        {rankMessages && rankCounts && (
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
        <button onClick={checkRankMessages}>결과확인</button>
      </div>
      <button className="reset" onClick={reset}>
        처음부터 다시하기
      </button>
    </div>
  );
}

export default App;
