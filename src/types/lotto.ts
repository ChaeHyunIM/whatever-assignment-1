export type LottoNumbers = [number, number, number, number, number, number];

export type WinningLottoNumbers = {
  mainNumbers: LottoNumbers;
  bonusNumber: number;
};

export type Rank = -1 | 1 | 2 | 3 | 4 | 5;
export type RankMessage = `${Exclude<Rank, -1>}등` | "꽝";
